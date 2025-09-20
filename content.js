// Google Meet Caption Copy & Google Docs Tab Style - Content Script
// This script provides fallback functionality and coordinates with individual feature scripts

console.log('🚀 Chrome Extension: Content script loaded');

// Simple initialization that just logs which site we're on
function initializeExtension() {
  const hostname = window.location.hostname;
  
  if (hostname === 'meet.google.com') {
    console.log('✓ Google Meet detected. Caption copy functionality should be active.');
  } else if (hostname === 'docs.google.com') {
    console.log('✓ Google Docs detected. Document tabs style enhancement should be active.');
  } else {
    console.log('ℹ️ Extension loaded on unsupported domain:', hostname);
  }
}

// Start the extension
initializeExtension();

// Add a listener for URL changes (both Google Meet and Google Docs are SPAs)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('📌 URL changed to:', url);
    initializeExtension();
  }
}).observe(document, {subtree: true, childList: true});