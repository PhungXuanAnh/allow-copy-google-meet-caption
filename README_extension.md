# Google Meet Caption Copy - Chrome Extension

A Chrome extension that allows you to copy text from Google Meet captions while maintaining visibility of speaker names and avatars.

## Description

This Chrome extension solves a common issue in Google Meet where caption text can't be easily selected and copied. When installed and enabled, this extension:

1. Makes caption text selectable and copyable
2. Preserves speaker names and avatars visibility
3. Works automatically on all Google Meet sessions

The extension uses DOM manipulation to modify caption styles without affecting the overall appearance or functionality of Google Meet.

## Features

- ✅ Makes caption text selectable and copyable
- ✅ Maintains visibility of speaker names and avatars
- ✅ Works with dynamic content (new speakers, caption updates)
- ✅ Detects caption structure automatically
- ✅ Performance optimized to minimize impact on meeting
- ✅ Compatible with the latest Google Meet UI

## Installation Instructions (Developer Mode)

Since this extension is not published on the Chrome Web Store, you need to install it in developer mode:

1. Download or clone this repository to your computer
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" button
5. Browse to the folder containing the extension files and select it
6. The extension should now be installed and active

## How to Use

1. Join a Google Meet session
2. Enable captions in Google Meet (click the "CC" button at the bottom)
3. The extension will automatically make captions selectable
4. You can now click and drag to select and copy caption text

## How It Works

The extension:

1. Automatically finds the caption container in Google Meet
2. Modifies CSS styles to make text selectable while keeping avatars visible by:
   - Setting caption text to a higher z-index (bringing it to the front)
   - Positioning speaker avatar elements to a lower z-index (sending them to the back)
   - Enabling user selection on caption text
   - Using pointer-events to allow clicking through avatar elements
3. Sets up mutation observers to apply styles to new captions as they appear
4. Adds a fallback check to ensure styles are consistently applied

## Privacy Notice

This extension:
- Does NOT collect any data
- Does NOT send any information to external servers
- Only runs on Google Meet pages
- Only modifies the appearance of caption elements
- Works completely locally on your device

## Technical Details

- Uses MutationObserver to detect new captions
- Targets elements by DOM structure for better reliability
- Applies styles with important flag to override Google Meet's defaults
- Includes fallback periodic check to ensure styles are maintained
- Sets proper z-index and pointer-events to allow both visibility and text selection

## Credits

Based on the original script by [Your Name] to make Google Meet captions copyable.

## License

MIT License