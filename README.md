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
- ✅ CSP compliant - no inline script injection

### Google Docs (docs.google.com) 
- ✅ Enhanced navigation item font styling (13px/18px arial)
- ✅ Reduced spacing between navigation items (20px height, optimized padding)
- ✅ Improved left padding for all navigation levels (0px, 12px, 24px, 36px)
- ✅ Removed vertical line dividers for cleaner appearance
- ✅ Dynamic content monitoring for real-time updates
- ✅ Automatic re-styling when document structure changes
- ✅ CSP compliant - no inline script injection

## Architecture

This extension uses a modular architecture with separate content scripts for each domain:

- **`content.js`**: Chrome extension content script (domain detection and logging)
- **`allow-copy-caption-in-google-meet/script.js`**: Google Meet caption functionality (loads directly on meet.google.com)
- **`change-style-of-document-tabs/script.js`**: Google Docs navigation styling (loads directly on docs.google.com)
- **`manifest.json`**: Extension configuration with separate content script declarations for each domain

Both core scripts can be used independently as standalone console scripts for quick testing.

## Execution Flow

The extension uses intelligent domain detection to load the appropriate functionality:

### Google Meet (`https://meet.google.com/*`)
1. **Content script loads** → `allow-copy-caption-in-google-meet/script.js` loads directly on meet.google.com
2. **Domain validation** → Script confirms we're on meet.google.com and initializes
3. **Caption enhancement** → `enableCaptionCopy()` applies styling to make captions selectable
4. **Dynamic monitoring** → Mutation observer watches for new captions and applies styles automatically

### Google Docs (`https://docs.google.com/*`)
1. **Content script loads** → `change-style-of-document-tabs/script.js` loads directly on docs.google.com
2. **Domain validation** → Script confirms we're on docs.google.com and initializes
3. **Navigation enhancement** → `enableDocumentTabsStyle()` applies improved styling to document tabs
4. **Dynamic monitoring** → Mutation observer watches for navigation changes and reapplies styles

### Domain Isolation
- Each script includes domain validation to prevent cross-execution
- Google Meet script validates `window.location.hostname === 'meet.google.com'`
- Google Docs script validates `window.location.hostname === 'docs.google.com'`
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

1. **Content Scripts**: Each domain loads its specific content script directly from manifest.json
2. **Domain Validation**: Each script validates it's running on the correct domain before initializing
3. **Automatic Processing**: Finds target elements and modifies CSS styles to enable functionality
4. **Dynamic Updates**: Uses mutation observers to handle new content as it appears
5. **Fallback Protection**: Includes periodic checks to ensure styles remain applied

### Technical Implementation

The core scripts:
- Automatically find their target containers (captions for Meet, navigation for Docs)
- Modify CSS styles to enable desired functionality while maintaining visual integrity
- Set up mutation observers to apply styles to new elements as they appear
- Add fallback checks to ensure styles are consistently applied
- Include domain validation to prevent cross-execution

### Modular Design Benefits

- **Code Reusability**: Core functionality can be used both in the extension and standalone
- **Easy Testing**: Copy-paste the script directly into console for quick testing
- **Maintainability**: Single source of truth for each feature's logic
- **Debugging**: Same debugging output whether used as extension or standalone script
- **CSP Compliance**: No dynamic script injection, eliminating Content Security Policy violations
- **Performance**: Scripts load only on their target domains, reducing unnecessary execution

## Privacy Notice

This extension:
- Does NOT collect any data
- Does NOT send any information to external servers
- Only runs on Google Meet pages
- Only modifies the appearance of caption elements
- Works completely locally on your device

## Technical Details

- **Modular Architecture**: Separate content scripts for each domain loaded directly from manifest
- **Domain Isolation**: Each script validates its target domain before execution
- **Dual-Mode Operation**: Core scripts work both as extension content scripts and standalone console scripts
- **MutationObserver**: Detects new content in real-time
- **Structure Detection**: Targets elements by DOM structure for better reliability
- **Performance Optimized**: Applies styles with important flag to override defaults
- **Fallback System**: Includes periodic check to ensure styles are maintained
- **Z-index Management**: Proper layering to allow both visibility and functionality
- **CSP Compliant**: No inline script injection, eliminating security policy violations

## File Structure

```
/
├── content.js                                    # Chrome extension content script (logging and coordination)
├── manifest.json                                 # Extension configuration with separate content scripts
├── allow-copy-caption-in-google-meet/
│   ├── script.js                                 # Google Meet caption functionality (auto-loads on meet.google.com)
│   └── README.md                                 # Documentation for standalone usage
└── change-style-of-document-tabs/
    └── script.js                                 # Google Docs navigation styling (auto-loads on docs.google.com)
```

## Credits

Based on the original script by [Your Name] to make Google Meet captions copyable.

## License

MIT License