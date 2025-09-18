# Google Meet Caption Copy Tool

A JavaScript script that allows you to copy text from Google Meet captions while maintaining visibility of speaker names and avatars.

## Description

This tool solves a common issue in Google Meet where caption text can't be easily selected and copied. By running this script in your browser's console while in a Google Meet session with captions enabled, you can:

1. Select and copy caption text
2. See who is speaking (names and avatars remain visible)
3. Interact with captions normally

The script uses DOM manipulation to modify caption styles without affecting the overall appearance of the meeting.

## Features

- ✅ Makes caption text selectable and copyable
- ✅ Maintains visibility of speaker names and avatars
- ✅ Works with dynamic content (new speakers, caption updates)
- ✅ Detects caption structure automatically
- ✅ Performance optimized to minimize impact on meeting performance
- ✅ Compatible with the latest Google Meet UI

## How to Use

### Manual Method

1. Join a Google Meet session
2. Enable captions in Google Meet (click the "CC" button at the bottom)
3. Open your browser's developer console:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+K` (Windows/Linux) or `Cmd+Option+K` (Mac)
4. Copy and paste the entire content of `allow-copy-caption-in-google-meet.js` into the console
5. Press Enter to execute the script

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
with open("allow-copy-caption-in-google-meet.js", "r") as file:
    script = file.read()
    driver.execute_script(script)
```

## How It Works

The script:

1. Finds the caption container in the Google Meet DOM
2. Modifies CSS styles to make text selectable while keeping avatars visible by:
   - Setting caption text to `z-index: 10` (bringing it to the front)
   - Positioning speaker avatar elements to `z-index: 5` (sending them to the back)
   - Enabling `user-select: text` on caption text
   - Using `pointer-events: none` on avatar elements to allow clicking through them
3. Sets up mutation observers to apply styles to new captions as they appear
4. Adds a fallback check to ensure styles are consistently applied

## Technical Details

- Uses MutationObserver to detect new captions
- Targets elements by DOM structure instead of CSS classes for better reliability
- Applies styles with `!important` flag to override Google Meet's default styles
- Includes fallback periodic check to ensure styles are maintained
- Sets proper z-index and pointer-events to allow both visibility and text selection