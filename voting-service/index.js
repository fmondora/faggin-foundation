const express = require('express');
const cors = require('cors');
const { getDb } = require('./db');
const { ghostAuth } = require('./ghost-auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.GHOST_URL || 'http://localhost:2368',
    credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// GET /api/topics - List all topics with vote counts
// Optional: pass ?email=xxx to include whether the user has voted
app.get('/api/topics', (req, res) => {
    try {
        const db = getDb();
        const email = req.query.email || '';

        let topics;
        if (email) {
            topics = db.prepare(`
                SELECT
                    t.id,
                    t.title,
                    t.description,
                    COUNT(v.id) as vote_count,
                    CASE WHEN EXISTS(
                        SELECT 1 FROM votes WHERE topic_id = t.id AND member_email = ?
                    ) THEN 1 ELSE 0 END as has_voted
                FROM topics t
                LEFT JOIN votes v ON v.topic_id = t.id
                GROUP BY t.id
                ORDER BY vote_count DESC, t.id ASC
            `).all(email);
        } else {
            topics = db.prepare(`
                SELECT
                    t.id,
                    t.title,
                    t.description,
                    COUNT(v.id) as vote_count,
                    0 as has_voted
                FROM topics t
                LEFT JOIN votes v ON v.topic_id = t.id
                GROUP BY t.id
                ORDER BY vote_count DESC, t.id ASC
            `).all();
        }

        res.json({ topics });
    } catch (err) {
        console.error('Error fetching topics:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/topics/:id/vote - Vote for a topic (requires auth)
app.post('/api/topics/:id/vote', ghostAuth, (req, res) => {
    try {
        const db = getDb();
        const topicId = parseInt(req.params.id, 10);
        const email = req.memberEmail;

        // Check topic exists
        const topic = db.prepare('SELECT id FROM topics WHERE id = ?').get(topicId);
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        // Insert vote (UNIQUE constraint prevents duplicates)
        try {
            db.prepare('INSERT INTO votes (topic_id, member_email) VALUES (?, ?)').run(topicId, email);
        } catch (err) {
            if (err.message.includes('UNIQUE constraint')) {
                return res.status(409).json({ error: 'Already voted for this topic' });
            }
            throw err;
        }

        // Return updated count
        const result = db.prepare('SELECT COUNT(*) as vote_count FROM votes WHERE topic_id = ?').get(topicId);
        res.json({ success: true, vote_count: result.vote_count });
    } catch (err) {
        console.error('Error voting:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/topics/:id/vote - Remove vote (requires auth)
app.delete('/api/topics/:id/vote', ghostAuth, (req, res) => {
    try {
        const db = getDb();
        const topicId = parseInt(req.params.id, 10);
        const email = req.memberEmail;

        const result = db.prepare('DELETE FROM votes WHERE topic_id = ? AND member_email = ?').run(topicId, email);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Vote not found' });
        }

        const count = db.prepare('SELECT COUNT(*) as vote_count FROM votes WHERE topic_id = ?').get(topicId);
        res.json({ success: true, vote_count: count.vote_count });
    } catch (err) {
        console.error('Error removing vote:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/topics - Create topic (admin only, simple token check)
app.post('/api/topics', (req, res) => {
    const adminToken = req.headers['x-admin-token'];
    if (adminToken !== (process.env.ADMIN_TOKEN || 'faggin-admin-secret')) {
        return res.status(403).json({ error: 'Admin access required' });
    }

    try {
        const db = getDb();
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const result = db.prepare('INSERT INTO topics (title, description) VALUES (?, ?)').run(title, description || '');
        res.status(201).json({
            success: true,
            topic: { id: result.lastInsertRowid, title, description }
        });
    } catch (err) {
        console.error('Error creating topic:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Voting service running on port ${PORT}`);
    // Initialize DB on startup
    getDb();
});
