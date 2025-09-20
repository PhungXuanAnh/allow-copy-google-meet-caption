// Google Docs Document Tabs Style Enhancement
// This script can be both imported as a module and run directly in the console

function enableDocumentTabsStyle() {
  console.log('🔍 Google Docs Tab Style: Applying navigation styling enhancements...');
  
  try {
    // Check if we're on a Google Docs page
    if (!window.location.hostname.includes('docs.google.com')) {
      console.log('❌ Not on Google Docs. Script will not execute.');
      return false;
    }

    // Function to apply styles with performance optimization
    const applyStylesToElement = (element, styles) => {
      Object.entries(styles).forEach(([property, value]) => {
        if (element.style.getPropertyValue(property) !== value) {
          element.style.setProperty(property, value, 'important');
        }
      });
    };

    // Define all the styling rules
    const applyNavigationStyles = () => {
      let stylesApplied = 0;

      // Apply font styling to navigation item content
      const navigationItems = document.querySelectorAll('.navigation-item-list.goog-container .navigation-item-content');
      navigationItems.forEach(item => {
        applyStylesToElement(item, { font: '13px/18px arial, sans-serif' });
        stylesApplied++;
      });

      // Reduce spacing between navigation items by adjusting height and line-height
      const navigationElements = document.querySelectorAll('.navigation-item-list.goog-container .navigation-item');
      navigationElements.forEach(item => {
        applyStylesToElement(item, {
          height: '20px',
          'line-height': '12px',
          'padding-top': '1px',
          'padding-bottom': '1px'
        });
        stylesApplied++;
      });

      // Reduce left padding for all navigation levels (subtract 21px to move items left)
      const level0Items = document.querySelectorAll('.navigation-item-content.navigation-item-level-0');
      level0Items.forEach(item => {
        applyStylesToElement(item, { 'padding-left': '0px' });
        stylesApplied++;
      });

      const level1Items = document.querySelectorAll('.navigation-item-content.navigation-item-level-1');
      level1Items.forEach(item => {
        applyStylesToElement(item, { 'padding-left': '12px' });
        stylesApplied++;
      });

      const level2Items = document.querySelectorAll('.navigation-item-content.navigation-item-level-2');
      level2Items.forEach(item => {
        applyStylesToElement(item, { 'padding-left': '24px' });
        stylesApplied++;
      });

      const level3Items = document.querySelectorAll('.navigation-item-content.navigation-item-level-3');
      level3Items.forEach(item => {
        applyStylesToElement(item, { 'padding-left': '36px' });
        stylesApplied++;
      });

      // Change left padding to 0 for all divs with class="navigation-item" and role="menuitem"
      const specificNavigationItems = document.querySelectorAll('div.navigation-item[role="menuitem"]');
      specificNavigationItems.forEach(item => {
        applyStylesToElement(item, { 'padding-left': '0px' });
        stylesApplied++;
      });

      // Change width to 320px for the specific navigation widget div
      // const navigationWidget = document.querySelector('div.navigation-widget.navigation-widget-unified-styling.docs-material.navigation-widget-floating-navigation-button.navigation-location-indicator.outline-refresh.navigation-widget-hoverable.navigation-widget-chaptered.left-sidebar-container-content-child');
      // if (navigationWidget) {
      //   applyStylesToElement(navigationWidget, { width: '320px' });
      //   stylesApplied++;
      // }

      // Remove vertical line divs from menu items
      const menuItems = document.querySelectorAll('div[role="menuitem"]');
      menuItems.forEach(menuItem => {
        const verticalLine = menuItem.querySelector('.navigation-item-vertical-line');
        if (verticalLine) {
          verticalLine.remove();
          stylesApplied++;
        }
      });

      return stylesApplied;
    };

    // Apply initial styles
    const initialStyles = applyNavigationStyles();
    console.log(`✅ Applied ${initialStyles} navigation style enhancements`);

    // Set up mutation observer to handle dynamic content changes
    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check for new navigation elements
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Check if the added node or its children contain navigation elements
              if (node.classList && (
                node.classList.contains('navigation-item') ||
                node.classList.contains('navigation-item-content') ||
                node.getAttribute('role') === 'menuitem'
              )) {
                shouldReapply = true;
              } else if (node.querySelector) {
                // Check if any descendants are navigation elements
                const hasNavigationElements = node.querySelector('.navigation-item, .navigation-item-content, div[role="menuitem"]');
                if (hasNavigationElements) {
                  shouldReapply = true;
                }
              }
            }
          });
        }
      });

      if (shouldReapply) {
        console.log('🔄 Navigation changes detected, reapplying styles...');
        setTimeout(() => {
          const newStyles = applyNavigationStyles();
          if (newStyles > 0) {
            console.log(`✅ Reapplied ${newStyles} navigation style enhancements`);
          }
        }, 100); // Small delay to ensure DOM is updated
      }
    });

    // Store observer globally so we can stop it if needed
    window.documentTabsObserver = observer;

    // Observe the document for changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false // We only care about structural changes
    });

    // Add a periodic check as a fallback (every 3 seconds)
    window.documentTabsPeriodicCheck = setInterval(() => {
      const stylesApplied = applyNavigationStyles();
      if (stylesApplied > 0) {
        console.log(`⚠️ Fallback check: applied ${stylesApplied} missing styles`);
      }
    }, 3000);

    console.log('🚀 Google Docs Document Tabs Style Enhancement Activated!');
    console.log('✅ Navigation item font styling applied');
    console.log('✅ Reduced spacing between navigation items');
    console.log('✅ Optimized left padding for all navigation levels');
    console.log('✅ Removed vertical line dividers');
    console.log('✅ Dynamic content monitoring enabled');

    // Return a cleanup function
    window.cleanupDocumentTabsScript = () => {
      if (window.documentTabsObserver) {
        window.documentTabsObserver.disconnect();
        console.log('🛑 Document tabs observer stopped');
      }
      if (window.documentTabsPeriodicCheck) {
        clearInterval(window.documentTabsPeriodicCheck);
        console.log('🛑 Document tabs periodic check stopped');
      }
    };

    return true;

  } catch (error) {
    console.error('❌ Error applying document tabs styles:', error);
    return false;
  }
}

// Script runs automatically when loaded as content script
// Only execute if we're on Google Docs
if (window.location.hostname === 'docs.google.com') {
  // Function to initialize document tabs styling
  const initDocumentTabsStyle = () => {
    // Wait for the page to fully load before applying navigation styles
    if (document.readyState === 'complete') {
      // Give Google Docs a moment to initialize its UI
      setTimeout(enableDocumentTabsStyle, 3000); // 3 seconds delay
    } else {
      // Wait for the page to load completely
      window.addEventListener('load', () => {
        // Then wait a bit for Google Docs' dynamic content
        setTimeout(enableDocumentTabsStyle, 3000); // 3 seconds delay
      });
    }
  };

  // Initialize on load
  initDocumentTabsStyle();

  // Also handle URL changes for SPA navigation
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('📌 Google Docs: URL changed, reinitializing tab styling...');
      setTimeout(enableDocumentTabsStyle, 1000); // Shorter delay for navigation
    }
  }).observe(document, {subtree: true, childList: true});
}
