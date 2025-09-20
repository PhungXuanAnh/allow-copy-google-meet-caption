# Google Meet Caption Copy Tool

A JavaScript script that allows you to copy text from Google Meet captions while maintaining visibility of speaker names and avatars. This script works both as a standalone console script and as the core functionality for the Chrome extension.

## Description

This tool solves a common issue in Google Meet where caption text can't be easily selected and copied. The script can be used in two ways:

1. **Standalone Console Script**: Copy-paste into browser console for immediate use
2. **Chrome Extension Core**: Powers the Chrome extension's caption copying functionality

By running this script in your browser's console while in a Google Meet session with captions enabled, you can:

1. Select and copy caption text
2. See who is speaking (names and avatars remain visible)
3. Interact with captions normally

The script uses DOM manipulation to modify caption styles without affecting the overall appearance of the meeting.

## Dual-Mode Operation

This script is designed to work in two contexts:

- **As a Chrome Extension Module**: Automatically loaded by the extension's content script
- **As a Standalone Script**: Can be copy-pasted directly into browser console for testing

The script automatically detects its execution context and behaves appropriately in each case.

## Features

- ✅ Makes caption text selectable and copyable
- ✅ Maintains visibility of speaker names and avatars
- ✅ Works with dynamic content (new speakers, caption updates)
- ✅ Detects caption structure automatically
- ✅ Performance optimized to minimize impact on meeting performance
- ✅ Compatible with the latest Google Meet UI

## How to Use

### Manual Console Method (For Testing & Development)

1. Join a Google Meet session
2. Enable captions in Google Meet (click the "CC" button at the bottom)
3. Open your browser's developer console:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+K` (Windows/Linux) or `Cmd+Option+K` (Mac)
4. Copy and paste the entire content of `script.js` into the console
5. Press Enter to execute the script
6. You should see activation messages in the console and captions should become selectable

### Chrome Extension Usage (Automatic)

If you're using the Chrome extension, this script runs automatically - no manual intervention needed.

### Automation with Selenium

This script can also be used in Selenium automation scenarios:

```python
from selenium import webdriver

# Initialize your webdriver
driver = webdriver.Chrome()
driver.get("https://meet.google.com/your-meeting-code")

# Wait for meeting to load and enable captions
# ... your code to join meeting and enable captions ...

# Run the caption copy script
with open("allow-copy-caption-in-google-meet/script.js", "r") as file:
    script = file.read()
    driver.execute_script(script)
```

## Script Features & Benefits

- ✅ **Dual-Mode Operation**: Works as both standalone script and extension module
- ✅ **Copy-Paste Testing**: Easy to test by pasting into console
- ✅ **Automatic Retry**: Retries if captions aren't immediately available
- ✅ **Performance Optimized**: Minimal impact on meeting performance
- ✅ **Robust Detection**: Uses DOM structure instead of CSS classes
- ✅ **Real-time Updates**: Handles new speakers and caption updates
- ✅ **Cleanup Function**: Provides `window.cleanupCaptionScript()` to stop observers
```

## How It Works

The script operates differently depending on its execution context:

### When Run in Console (Standalone Mode)
1. Immediately executes the `enableCaptionCopy()` function
2. Finds the caption container in the Google Meet DOM
3. Applies caption manipulation styles
4. Sets up monitoring for new captions

### When Loaded by Extension (Module Mode)
1. Exports the `enableCaptionCopy()` function for the content script to call
2. Waits for the content script to invoke it at the appropriate time
3. Provides the same functionality but integrated with extension lifecycle

### Core Functionality (Both Modes)
The script modifies CSS styles to make text selectable while keeping avatars visible by:
- Setting caption text to `z-index: 10` (bringing it to the front)
- Positioning speaker avatar elements to `z-index: 5` (sending them to the back)
- Enabling `user-select: text` on caption text
- Using `pointer-events: none` on avatar elements to allow clicking through them
- Sets up mutation observers to apply styles to new captions as they appear
- Adds a fallback check to ensure styles are consistently applied

## Technical Implementation

### Detection Logic
- **Module Detection**: Checks for `typeof module !== 'undefined' && module.exports`
- **Standalone Execution**: Runs immediately when `module` is undefined
- **DOM Structure Targeting**: Uses element structure instead of CSS classes for reliability

### Performance Features
- **MutationObserver**: Real-time detection of new captions
- **Optimized Styling**: Only applies styles when needed
- **Fallback Timer**: 2-second periodic check ensures consistency
- **Cleanup Function**: `window.cleanupCaptionScript()` stops all observers

### Error Handling
- **Caption Container Detection**: Retries if captions not immediately available
- **Structure Validation**: Warns if Google Meet's DOM structure changes
- **Graceful Degradation**: Continues working even if some elements aren't found