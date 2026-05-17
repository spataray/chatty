# Project Overview: Chatty

Chatty is a lightweight, web-based interactive "chat fiction" reader. It allows users to browse a collection of stories and read them in a format that mimics a messaging app. The project is designed for simplicity, using vanilla web technologies and JSON-driven content.

## Main Technologies
- **HTML5 & CSS3**: For structure and styling.
- **JavaScript (Vanilla)**: Handles story loading, state management, and the interactive "tap-to-read" mechanic.
- **JSON**: Serves as the database for story metadata and message content.

## Architecture
- **Hub (`index.html`)**: Fetches `stories/story-index.json` to display available stories.
- **Reader (`reader.html`)**: The primary interface for reading. It uses URL parameters (e.g., `?story=filename.json`) to determine which story to load.
- **Logic (`js/reader.js`)**: Fetches the specific story JSON and renders messages sequentially upon user interaction (clicks/taps).
- **Data (`stories/`)**: Contains the index and individual story files.

## Getting Started

### Prerequisites
- A modern web browser.
- A local web server (optional but recommended for fetching JSON files due to CORS restrictions).

### Running the Project
1.  Open a terminal in the project root.
2.  Start a local server:
    ```bash
    # Using Node.js
    npx serve .
    
    # Using Python
    python3 -m http.server
    ```
3.  Navigate to `http://localhost:3000` (or the port provided) in your browser.

## Development Conventions

### Adding a New Story
1.  **Create the JSON file**: Add a new file in the `stories/` directory (e.g., `my-new-story.json`).
2.  **Define Characters**: Assign characters a name, avatar URL, and side (`left` or `right`).
3.  **Add Messages**: Use the following message types:
    - `char`: A message from a character. Requires a `char` key matching a defined character and a `text` key.
    - `system`: A descriptive text or timestamp. Requires a `content` key.
4.  **Register the Story**: Add an entry for your story in `stories/story-index.json`.

### Styling
- Global styles and reader-specific layout are managed in `css/style.css`.
- The reader supports dynamic backgrounds via the `background` property in the story JSON.

## Key Files
- `index.html`: The story hub / landing page.
- `reader.html`: The interactive story reader interface.
- `js/reader.js`: Core logic for fetching and rendering stories.
- `stories/story-index.json`: The registry of all available stories.
- `stories/mystery-at-midnight.json`: Example story content.
