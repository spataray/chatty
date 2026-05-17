document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const storyFile = urlParams.get('story');
    const chatWindow = document.getElementById('chat-window');
    const titleDisplay = document.getElementById('title-display');
    const tapOverlay = document.getElementById('tap-overlay');

    let storyData = null;
    let currentIndex = -1;

    if (!storyFile) {
        window.location.href = 'index.html';
        return;
    }

    fetch(`stories/${storyFile}`)
        .then(res => res.json())
        .then(data => {
            storyData = data;
            titleDisplay.textContent = data.title;
        })
        .catch(err => {
            console.error('Error loading story:', err);
            titleDisplay.textContent = "Error loading story";
        });

    function addMessage() {
        if (!storyData || currentIndex >= storyData.messages.length - 1) return;

        currentIndex++;
        const msg = storyData.messages[currentIndex];
        const msgDiv = document.createElement('div');

        if (msg.type === 'system') {
            msgDiv.className = 'message system';
            msgDiv.textContent = msg.content;
        } else {
            const char = storyData.characters[msg.char];
            msgDiv.className = `message bubble-container ${char.side}`;
            msgDiv.innerHTML = `
                ${char.side === 'left' ? `<img src="${char.avatar}" class="avatar">` : ''}
                <div class="bubble-content">
                    ${char.side === 'left' ? `<span class="name">${char.name}</span>` : ''}
                    <div class="bubble">${msg.text}</div>
                </div>
                ${char.side === 'right' ? `<img src="${char.avatar}" class="avatar">` : ''}
            `;
        }

        chatWindow.appendChild(msgDiv);
        window.scrollTo(0, document.body.scrollHeight);

        // Visual feedback for tap
        tapOverlay.classList.add('tapped');
        setTimeout(() => tapOverlay.classList.remove('tapped'), 100);
    }

    document.body.addEventListener('click', addMessage);
});
