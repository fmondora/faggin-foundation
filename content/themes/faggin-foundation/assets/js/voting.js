/**
 * Faggin Foundation - Voting System Frontend
 *
 * Fetches topics from the voting API and renders interactive vote cards.
 * Requires Ghost membership for voting (uses @member data from template).
 */

(function () {
    'use strict';

    const VOTING_API = 'http://localhost:3001/api';
    const container = document.getElementById('voting-topics-container');

    if (!container) return;

    // Read member info injected by Handlebars template
    const memberEmail = container.dataset.memberEmail || '';
    const isLoggedIn = !!memberEmail;

    init();

    async function init() {
        container.innerHTML = '<div class="voting-loading">Caricamento temi...</div>';

        try {
            const url = memberEmail
                ? `${VOTING_API}/topics?email=${encodeURIComponent(memberEmail)}`
                : `${VOTING_API}/topics`;

            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            render(data.topics);
        } catch (err) {
            console.error('Voting API error:', err);
            // Fallback: show static topics if API is unavailable
            container.innerHTML = '';
            showStaticFallback();
        }
    }

    function render(topics) {
        if (!topics || topics.length === 0) {
            container.innerHTML = '<p class="voting-loading">Nessun tema disponibile.</p>';
            return;
        }

        container.innerHTML = '';

        const list = document.createElement('div');
        list.className = 'voting-topics-dynamic';

        topics.forEach(function (topic) {
            const card = document.createElement('div');
            card.className = 'topic-card';
            card.dataset.topicId = topic.id;

            const info = document.createElement('div');
            info.className = 'topic-info';
            info.innerHTML =
                '<h4>' + escapeHtml(topic.title) + '</h4>' +
                '<p>' + escapeHtml(topic.description) + '</p>';

            const voteArea = document.createElement('div');
            voteArea.className = 'topic-vote-area';

            const count = document.createElement('span');
            count.className = 'vote-count';
            count.textContent = topic.vote_count;

            const label = document.createElement('span');
            label.className = 'vote-label';
            label.textContent = topic.vote_count === 1 ? 'voto' : 'voti';

            voteArea.appendChild(count);
            voteArea.appendChild(label);

            if (isLoggedIn) {
                var btn = document.createElement('button');
                btn.className = 'btn-vote' + (topic.has_voted ? ' voted' : '');
                btn.textContent = topic.has_voted ? 'Votato' : 'Vota';
                btn.addEventListener('click', function () {
                    handleVote(topic.id, topic.has_voted, card);
                });
                voteArea.appendChild(btn);
            }

            card.appendChild(info);
            card.appendChild(voteArea);
            list.appendChild(card);
        });

        container.appendChild(list);

        if (!isLoggedIn) {
            var prompt = document.createElement('div');
            prompt.className = 'voting-login-prompt';
            prompt.innerHTML = '<a href="#/portal/signup" data-portal="signup">Accedi o registrati</a> per votare il tuo tema preferito.';
            container.appendChild(prompt);
        }
    }

    async function handleVote(topicId, hasVoted, card) {
        var btn = card.querySelector('.btn-vote');
        if (!btn) return;

        btn.disabled = true;
        btn.textContent = '...';

        try {
            var method = hasVoted ? 'DELETE' : 'POST';
            var res = await fetch(VOTING_API + '/topics/' + topicId + '/vote', {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Member-Email': memberEmail
                },
                credentials: 'include'
            });

            if (!res.ok) {
                var errData = await res.json();
                throw new Error(errData.error || 'Vote failed');
            }

            var data = await res.json();

            // Update UI
            var countEl = card.querySelector('.vote-count');
            var labelEl = card.querySelector('.vote-label');
            countEl.textContent = data.vote_count;
            labelEl.textContent = data.vote_count === 1 ? 'voto' : 'voti';

            if (hasVoted) {
                btn.classList.remove('voted');
                btn.textContent = 'Vota';
                // Update click handler
                btn.onclick = function () { handleVote(topicId, false, card); };
            } else {
                btn.classList.add('voted');
                btn.textContent = 'Votato';
                btn.onclick = function () { handleVote(topicId, true, card); };
            }
        } catch (err) {
            console.error('Vote error:', err);
            btn.textContent = hasVoted ? 'Votato' : 'Vota';
        } finally {
            btn.disabled = false;
        }
    }

    function showStaticFallback() {
        // If the API is down, show the existing static topic items
        var staticTopics = document.querySelectorAll('.voting-topics .topic-item');
        if (staticTopics.length > 0) {
            document.querySelector('.voting-topics').style.display = '';
        }
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
})();
