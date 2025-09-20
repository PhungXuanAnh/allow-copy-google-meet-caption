// Google Meet Caption Copy & Google Docs Tab Style - Content Script
// This script enables copying text from Google Meet captions and enhances Google Docs navigation styling

// Function to load and execute the caption copy script for Google Meet
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

// Function to load and execute the document tabs styling script for Google Docs
async function loadDocumentTabsScript() {
  try {
    // Load the script dynamically to avoid duplication
    const scriptUrl = chrome.runtime.getURL('change-style-of-document-tabs/script.js');
    const response = await fetch(scriptUrl);
    const scriptContent = await response.text();
    
    // Execute the script in a way that exposes the enableDocumentTabsStyle function
    const scriptWrapper = `
      ${scriptContent}
      // Export enableDocumentTabsStyle to window for content script access
      window.enableDocumentTabsStyle = enableDocumentTabsStyle;
    `;
    
    // Execute the wrapped script
    const script = document.createElement('script');
    script.textContent = scriptWrapper;
    document.head.appendChild(script);
    document.head.removeChild(script);
    
    // Now we can call the function
    if (window.enableDocumentTabsStyle) {
      window.enableDocumentTabsStyle();
    }
  } catch (error) {
    console.error('Failed to load document tabs script:', error);
    // Fallback: use inline version
    enableDocumentTabsFallback();
  }
}

// Fallback function for Google Meet that provides basic functionality if dynamic loading fails
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

// Fallback function for Google Docs that provides basic functionality if dynamic loading fails
function enableDocumentTabsFallback() {
  console.log('🔍 Google Docs Tab Style (Fallback): Applying basic navigation styling...');
  
  try {
    // Basic CSS injection for navigation styling
    const style = document.createElement('style');
    style.textContent = `
      .navigation-item-list.goog-container .navigation-item-content {
        font: 13px/18px arial, sans-serif !important;
      }
      .navigation-item-list.goog-container .navigation-item {
        height: 20px !important;
        line-height: 12px !important;
        padding-top: 1px !important;
        padding-bottom: 1px !important;
      }
      .navigation-item-content.navigation-item-level-0 {
        padding-left: 0px !important;
      }
      .navigation-item-content.navigation-item-level-1 {
        padding-left: 12px !important;
      }
      .navigation-item-content.navigation-item-level-2 {
        padding-left: 24px !important;
      }
      .navigation-item-content.navigation-item-level-3 {
        padding-left: 36px !important;
      }
      .navigation-item-vertical-line {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    console.log('🚀 Google Docs Tab Style (Fallback): Basic navigation styling applied!');
  } catch (error) {
    console.error('❌ Error applying fallback document tabs styles:', error);
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

// Function to check if we are in a Google Docs page with navigation elements
function checkForGoogleDocs() {
  const isGoogleDocs = window.location.hostname === 'docs.google.com';
  if (isGoogleDocs) {
    console.log('✓ Google Docs detected. Document tabs style enhancement is ready.');
    
    // Wait for the page to fully load before applying navigation styles
    if (document.readyState === 'complete') {
      // Give Google Docs a moment to initialize its UI
      setTimeout(loadDocumentTabsScript, 3000); // 3 seconds delay
    } else {
      // Wait for the page to load completely
      window.addEventListener('load', () => {
        // Then wait a bit for Google Docs' dynamic content
        setTimeout(loadDocumentTabsScript, 3000); // 3 seconds delay
      });
    }
  }
}

// Main function to determine which site we're on and load appropriate scripts
function initializeExtension() {
  const hostname = window.location.hostname;
  
  if (hostname === 'meet.google.com') {
    checkForGoogleMeet();
  } else if (hostname === 'docs.google.com') {
    checkForGoogleDocs();
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