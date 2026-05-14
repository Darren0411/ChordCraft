# ChordCraft

ChordCraft is a Chrome extension designed to improve the readability and usability of guitar chord sheets on Ultimate Guitar.

The extension allows users to customize the appearance of lyrics and chords for a cleaner and more comfortable playing experience during practice sessions or live performances.

## Features

- Custom chord color selection
- Custom lyrics color selection
- Adjustable font size
- Multi-column chord sheet layout
- Persistent user preferences using Chrome Storage API
- Fullscreen mode support

## Tech Stack

- HTML
- CSS
- JavaScript
- Chrome Extension Manifest V3

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chordcraft.git
```

### 2. Open Chrome Extensions

Open the following URL in Chrome:

```text
chrome://extensions
```

### 3. Enable Developer Mode

Enable the **Developer mode** toggle from the top-right corner.

### 4. Load the Extension

Click:

```text
Load unpacked
```

Then select the `ChordCraft` project folder.

### 5. Open Ultimate Guitar

Visit any Ultimate Guitar chord page:

```text
https://tabs.ultimate-guitar.com/
```

### 6. Use the Extension

- Click the ChordCraft extension icon from the Chrome toolbar
- Customize:
  - Chord colors
  - Lyrics colors
  - Font size
  - Column layout
- Changes are applied instantly and saved automatically

## Project Structure

```text
ChordCraft/
│
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── styles.css
├── README.md
│
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
```

## Author

Darren D'sa