// Google Meet Caption Copy - Content Script
// This script enables copying text from Google Meet captions

// Function to load and execute the caption copy script
async function loadCaptionCopyScript() {
  try {
    // Load the script dynamically to avoid duplication
    const scriptUrl = chrome.runtime.getURL('allow-copy-caption-in-google-meet/script.js');
    const response = await fetch(scriptUrl);
    const scriptContent = await response.text();
    
    // Execute the script in a way that exposes the enableCaptionCopy function
    const scriptWrapper = `
      ${scriptContent}
      // Export enableCaptionCopy to window for content script access
      window.enableCaptionCopy = enableCaptionCopy;
    `;
    
    // Execute the wrapped script
    const script = document.createElement('script');
    script.textContent = scriptWrapper;
    document.head.appendChild(script);
    document.head.removeChild(script);
    
    // Now we can call the function
    if (window.enableCaptionCopy) {
      window.enableCaptionCopy();
    }
  } catch (error) {
    console.error('Failed to load caption copy script:', error);
    // Fallback: use inline version
    enableCaptionCopyFallback();
  }
}

// Fallback function that provides basic functionality if dynamic loading fails
function enableCaptionCopyFallback() {
  console.log('🔍 Google Meet Caption Copy (Fallback): Searching for caption container...');
  
  const targetNode = document.querySelector('div[aria-label="Captions"]');
  if (targetNode) {
    // Basic styling to enable text selection on captions
    const style = document.createElement('style');
    style.textContent = `
      div[aria-label="Captions"] * {
        user-select: text !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(style);
    console.log('🚀 Google Meet Caption Copy (Fallback): Basic text selection enabled!');
  } else {
    console.log('❌ Caption container not found.');
  }
}

// Function to check if we are in a Google Meet page with potential captions
function checkForGoogleMeet() {
  const isGoogleMeet = window.location.hostname === 'meet.google.com';
  if (isGoogleMeet) {
    console.log('✓ Google Meet detected. Caption copy extension is ready.');
    
    // Wait for the page to fully load before searching for caption elements
    if (document.readyState === 'complete') {
      // Give Google Meet a moment to initialize its UI
      setTimeout(loadCaptionCopyScript, 5000); // 5 seconds delay
    } else {
      // Wait for the page to load completely
      window.addEventListener('load', () => {
        // Then wait a bit longer for Google Meet's dynamic content
        setTimeout(loadCaptionCopyScript, 5000); // 5 seconds delay
      });
    }
  }
}

// Start the extension
checkForGoogleMeet();

// Add a listener for URL changes (Google Meet is a SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('📌 URL changed to:', url);
    checkForGoogleMeet();
  }
}).observe(document, {subtree: true, childList: true});