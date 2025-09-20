# Google Meet Caption Copy - Chrome Extension

A Chrome extension that allows you to copy text from Google Meet captions while maintaining visibility of speaker names and avatars.

## Description

This Chrome extension solves a common issue in Google Meet where caption text can't be easily selected and copied. When installed and enabled, this extension:

1. Makes caption text selectable and copyable
2. Preserves speaker names and avatars visibility
3. Works automatically on all Google Meet sessions

The extension uses DOM manipulation to modify caption styles without affecting the overall appearance or functionality of Google Meet.

## Architecture

This extension uses a modular architecture to avoid code duplication:

- **`content.js`**: Chrome extension content script (lightweight wrapper)
- **`allow-copy-caption-in-google-meet/script.js`**: Core functionality (can also be used standalone)
- **`manifest.json`**: Extension configuration with web-accessible resources

The core script can be used both as part of the extension and as a standalone console script for quick testing.

## Features

- ✅ Makes caption text selectable and copyable
- ✅ Maintains visibility of speaker names and avatars
- ✅ Works with dynamic content (new speakers, caption updates)
- ✅ Detects caption structure automatically
- ✅ Performance optimized to minimize impact on meeting
- ✅ Compatible with the latest Google Meet UI

## Installation Instructions (Developer Mode)

Since this extension is not published on the Chrome Web Store, you need to install it in developer mode:

### GUI Method
1. Download or clone this repository to your computer
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" button
5. Browse to the folder containing the extension files and select it
6. The extension should now be installed and active

### Command-Line Method

**Note**: This command-line method will temporarily load the extension for the current session. The extension will remain installed until you close Chrome.

1. Clone the repository using git:
   ```bash
   git clone [repository-url] ~/Downloads/allow-copy-google-meet-caption
   ```
   Or download directly:
   ```bash
   wget [zip-file-url] -O extension.zip && unzip extension.zip -d ~/Downloads/allow-copy-google-meet-caption
   ```

2. Use the provided installation script:
   ```bash
   cd ~/Downloads/allow-copy-google-meet-caption
   chmod +x install_extension.sh
   ./install_extension.sh
   ```

3. Alternatively, launch Chrome with the extension loaded manually (close Chrome first if it's already running):
   ```bash
   google-chrome --load-extension=~/Downloads/allow-copy-google-meet-caption
   ```

   For Chrome on macOS:
   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --load-extension=~/Downloads/allow-copy-google-meet-caption
   ```

## How to Use

1. Join a Google Meet session
2. Enable captions in Google Meet (click the "CC" button at the bottom)
3. The extension will automatically make captions selectable
4. You can now click and drag to select and copy caption text

## Testing and Development

For quick testing or development purposes, you can also run the core script directly in the browser console:

1. Join a Google Meet session with captions enabled
2. Open your browser's developer console (`F12` or `Ctrl+Shift+J`)
3. Copy and paste the entire content of `allow-copy-caption-in-google-meet/script.js` into the console
4. Press Enter to execute the script

This allows for rapid testing and debugging without needing to reload the extension.

## How It Works

The extension:

1. **Content Script (`content.js`)**: Detects Google Meet pages and dynamically loads the core functionality
2. **Core Script (`allow-copy-caption-in-google-meet/script.js`)**: Contains the main caption manipulation logic
3. **Automatic Processing**: Finds caption containers and modifies CSS styles to enable text selection
4. **Dynamic Updates**: Uses mutation observers to handle new captions as they appear
5. **Fallback Protection**: Includes periodic checks to ensure styles remain applied

### Technical Implementation

The core script:
- Automatically finds the caption container in Google Meet
- Modifies CSS styles to make text selectable while keeping avatars visible by:
  - Setting caption text to a higher z-index (bringing it to the front)
  - Positioning speaker avatar elements to a lower z-index (sending them to the back)
  - Enabling user selection on caption text
  - Using pointer-events to allow clicking through avatar elements
- Sets up mutation observers to apply styles to new captions as they appear
- Adds a fallback check to ensure styles are consistently applied

### Modular Design Benefits

- **Code Reusability**: Core functionality can be used both in the extension and standalone
- **Easy Testing**: Copy-paste the script directly into console for quick testing
- **Maintainability**: Single source of truth for caption manipulation logic
- **Debugging**: Same debugging output whether used as extension or standalone script

## Privacy Notice

This extension:
- Does NOT collect any data
- Does NOT send any information to external servers
- Only runs on Google Meet pages
- Only modifies the appearance of caption elements
- Works completely locally on your device

## Technical Details

- **Modular Architecture**: Core functionality separated from extension wrapper
- **Dynamic Loading**: Content script fetches and executes core script at runtime
- **Dual-Mode Operation**: Core script works both as extension module and standalone console script
- **MutationObserver**: Detects new captions in real-time
- **Structure Detection**: Targets elements by DOM structure for better reliability
- **Performance Optimized**: Applies styles with important flag to override Google Meet's defaults
- **Fallback System**: Includes periodic check to ensure styles are maintained
- **Z-index Management**: Proper layering to allow both visibility and text selection

## File Structure

```
/
├── content.js                 # Chrome extension content script (lightweight wrapper)
├── manifest.json              # Extension configuration with web_accessible_resources
└── allow-copy-caption-in-google-meet/
    ├── script.js              # Core functionality (dual-mode: extension + standalone)
    └── README.md              # Detailed documentation for standalone usage
```

## Credits

Based on the original script by [Your Name] to make Google Meet captions copyable.

## License

MIT License