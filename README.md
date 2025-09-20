# Google Meet Caption Copy & Google Docs Tab Style - Chrome Extension

A Chrome extension that enhances your Google workspace experience by enabling caption copying in Google Meet and improving navigation styling in Google Docs.

## Description

This Chrome extension provides two key enhancements for Google workspace:

### Google Meet Caption Copy
Makes caption text selectable and copyable while maintaining visibility of speaker names and avatars.

### Google Docs Tab Style Enhancement
Improves the visual styling of navigation tabs in Google Docs by:
- Reducing font size and line spacing for better readability
- Optimizing padding and indentation for nested navigation levels
- Removing unnecessary vertical line dividers
- Creating a more compact and clean navigation experience

## Features

### Google Meet (meet.google.com)
- ✅ Makes caption text selectable and copyable
- ✅ Maintains visibility of speaker names and avatars  
- ✅ Works with dynamic content (new speakers, caption updates)
- ✅ Detects caption structure automatically
- ✅ Performance optimized to minimize impact on meetings

### Google Docs (docs.google.com) 
- ✅ Enhanced navigation item font styling (13px/18px arial)
- ✅ Reduced spacing between navigation items (20px height, optimized padding)
- ✅ Improved left padding for all navigation levels (0px, 12px, 24px, 36px)
- ✅ Removed vertical line dividers for cleaner appearance
- ✅ Dynamic content monitoring for real-time updates
- ✅ Automatic re-styling when document structure changes

## Architecture

This extension uses a modular architecture to avoid code duplication:

- **`content.js`**: Chrome extension content script (domain detection and script loading)
- **`allow-copy-caption-in-google-meet/script.js`**: Google Meet caption functionality
- **`change-style-of-document-tabs/script.js`**: Google Docs navigation styling
- **`manifest.json`**: Extension configuration with permissions for both domains

Both core scripts can be used independently as standalone console scripts for quick testing.

## Execution Flow

The extension uses intelligent domain detection to load the appropriate functionality:

### Google Meet (`https://meet.google.com/*`)
1. **Content script loads** → `initializeExtension()` detects Google Meet domain
2. **Domain check** → `checkForGoogleMeet()` confirms we're on meet.google.com
3. **Script loading** → `loadCaptionCopyScript()` fetches and executes the caption copy script
4. **Caption enhancement** → `enableCaptionCopy()` applies styling to make captions selectable
5. **Dynamic monitoring** → Mutation observer watches for new captions and applies styles automatically

### Google Docs (`https://docs.google.com/*`)
1. **Content script loads** → `initializeExtension()` detects Google Docs domain  
2. **Domain check** → `checkForGoogleDocs()` confirms we're on docs.google.com
3. **Script loading** → `loadDocumentTabsScript()` fetches and executes the navigation styling script
4. **Navigation enhancement** → `enableDocumentTabsStyle()` applies improved styling to document tabs
5. **Dynamic monitoring** → Mutation observer watches for navigation changes and reapplies styles

### Domain Isolation
- Each script includes domain validation to prevent cross-execution
- Google Docs script validates `window.location.hostname.includes('docs.google.com')`
- Content script only loads appropriate functionality based on current domain
- Extension works seamlessly across both Google workspace applications

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