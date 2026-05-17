document.addEventListener('DOMContentLoaded', () => {
    // Set language to user's phone/browser default
    document.documentElement.lang = navigator.language || 'en';

    const urlParams = new URLSearchParams(window.location.search);
    const storyFile = urlParams.get('story');
    const chatWindow = document.getElementById('chat-window');
    const titleDisplay = document.getElementById('title-display');
    const tapOverlay = document.getElementById('tap-overlay');

    // UI Elements for Notifications & Menu
    const notifBanner = document.getElementById('notification-banner');
    const notifName = document.getElementById('notif-name');
    const notifMsg = document.getElementById('notif-msg');
    const notifAvatar = document.getElementById('notif-avatar');
    
    const menuBtn = document.getElementById('menu-btn');
    const closeMenu = document.getElementById('close-menu');
    const storyMenu = document.getElementById('story-menu');
    const menuStoryList = document.getElementById('menu-story-list');

    const typingIndicator = document.getElementById('typing-indicator');
    const fakeInput = document.getElementById('fake-input');

    let storyData = null;
    let currentIndex = -1;
    let isWaiting = false;

    if (!storyFile) {
        window.location.href = 'index.html';
        return;
    }

    // Load main story
    fetch(`stories/${storyFile}`)
        .then(res => res.json())
        .then(data => {
            storyData = data;
            titleDisplay.textContent = data.title;
            if (data.background) {
                document.body.style.backgroundImage = `url('${data.background}')`;
            }
        });

    // Load story index for menu
    fetch('stories/story-index.json')
        .then(res => res.json())
        .then(stories => {
            stories.forEach(story => {
                const item = document.createElement('div');
                item.className = 'menu-item';
                item.textContent = story.title;
                item.onclick = () => window.location.href = `reader.html?story=${story.file}`;
                menuStoryList.appendChild(item);
            });
        });

    function showNotification(char, text) {
        notifName.textContent = char.name;
        notifMsg.textContent = text;
        notifAvatar.src = char.avatar;
        notifBanner.classList.remove('hidden');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notifBanner.classList.add('hidden');
        }, 3000);
    }

    function addMessage() {
        if (!storyData || currentIndex >= storyData.messages.length - 1 || isWaiting) return;

        currentIndex++;
        const msg = storyData.messages[currentIndex];
        
        // Check for delay/wait
        if (msg.wait) {
            isWaiting = true;
            fakeInput.textContent = "Wait for response...";
            setTimeout(() => {
                isWaiting = false;
                fakeInput.textContent = "Type a message...";
                renderMessage(msg);
                // Trigger auto-reveal for the delayed message
            }, msg.wait * 1000); // Wait in seconds
            return;
        }

        renderMessage(msg);
    }

    function renderMessage(msg) {
        const msgDiv = document.createElement('div');

        if (msg.type === 'system') {
            msgDiv.className = 'message system';
            msgDiv.textContent = msg.content;
        } else {
            const char = storyData.characters[msg.char];
            
            if (char.side === 'left') {
                showNotification(char, msg.text);
            }

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
        chatWindow.scrollTop = chatWindow.scrollHeight;

        tapOverlay.classList.add('tapped');
        setTimeout(() => tapOverlay.classList.remove('tapped'), 100);
    }

    // Menu Controls
    menuBtn.onclick = (e) => {
        e.stopPropagation();
        storyMenu.classList.toggle('hidden');
    };
    closeMenu.onclick = () => storyMenu.classList.add('hidden');
    document.body.onclick = (e) => {
        if (!storyMenu.contains(e.target) && e.target !== menuBtn) {
            storyMenu.classList.add('hidden');
        }
    };

    // Interaction to progress story
    document.body.addEventListener('click', (e) => {
        if (storyMenu.classList.contains('hidden')) {
            addMessage();
        }
    });
});
