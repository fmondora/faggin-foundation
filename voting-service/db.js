const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'voting.db');

let db;

function getDb() {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        initSchema();
        seedTopics();
    }
    return db;
}

function initSchema() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS votes (
            id INTEGER PRIMARY KEY,
            topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
            member_email TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(topic_id, member_email)
        );
    `);
}

function seedTopics() {
    const count = db.prepare('SELECT COUNT(*) as c FROM topics').get().c;
    if (count > 0) return;

    const insert = db.prepare('INSERT INTO topics (title, description) VALUES (?, ?)');

    const topics = [
        ['Coscienza e intelligenza artificiale', 'Puo\' una macchina diventare consapevole? Il dibattito tra Faggin e i sostenitori dell\'IA forte.'],
        ['La fisica quantistica spiegata semplice', 'I concetti chiave della meccanica quantistica alla base della teoria di Faggin, accessibili a tutti.'],
        ['Esperienze di pre-morte e coscienza', 'Cosa suggeriscono le NDE sulla natura della coscienza e sulla sopravvivenza dopo la morte fisica?'],
        ['Meditazione e consapevolezza', 'Il ruolo della meditazione nello sviluppo della consapevolezza, secondo l\'esperienza di Faggin.'],
        ['Sapere vs. Conoscere', 'La differenza tra conoscenza simbolica e comprensione vissuta. Implicazioni per l\'educazione.'],
        ['Libero arbitrio: illusione o realta\'?', 'Perche\' Faggin sostiene che il libero arbitrio e\' una proprieta\' fondamentale della natura.'],
        ['Scienza e spiritualita\': il Nousym', 'Come scienza e spiritualita\' possono convergere in una visione unitaria della realta\'.'],
        ['Il futuro dell\'umanita\' nell\'era dell\'IA', 'Come preservare la nostra umanita\' in un mondo dominato dall\'intelligenza artificiale.']
    ];

    const insertMany = db.transaction((topics) => {
        for (const [title, description] of topics) {
            insert.run(title, description);
        }
    });

    insertMany(topics);
    console.log(`Seeded ${topics.length} topics.`);
}

module.exports = { getDb };
