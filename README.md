# Chatty 📱✨

Chatty is a lightweight, web-based interactive "chat fiction" reader. It allows users to browse a collection of stories and read them in an immersive format that mimics a modern messaging app.

## Features
- 📖 **Interactive Reading**: Progress through stories with a simple tap-to-read mechanic.
- 🎨 **Dynamic Backgrounds**: Stories can define their own mood-setting background images.
- 🛠️ **JSON-Driven**: Easy to add or modify stories without touching core code.
- 🚀 **Zero Dependencies**: Built with vanilla HTML, CSS, and JavaScript.

## Getting Started

### Prerequisites
- A modern web browser.
- A local web server (to avoid CORS issues when fetching local JSON files).

### Running the Project
1.  Clone the repository.
2.  Start a local server in the project root:
    ```bash
    # If you have Node.js installed:
    npx serve .
    
    # Or using Python:
    python3 -m http.server
    ```
3.  Open `http://localhost:3000` (or the port specified) in your browser.

## Architecture
- **Hub (`index.html`)**: The landing page where stories are listed.
- **Reader (`reader.html`)**: The interactive reader interface.
- **Data (`stories/`)**: Contains `story-index.json` and individual story data files.

## Adding Your Own Stories
1.  Create a JSON file in the `stories/` directory following the structure in `mystery-at-midnight.json`.
2.  Add your new story's metadata to `stories/story-index.json`.

---
*Created for the "Chatty" prototype project.*
