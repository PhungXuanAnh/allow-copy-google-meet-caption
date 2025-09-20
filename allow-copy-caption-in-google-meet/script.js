// Google Meet Caption Copy Core Functionality
// This script can be both imported as a module and run directly in the console

function enableCaptionCopy() {
  console.log('🔍 Google Meet Caption Copy: Searching for caption container...');
  
  const targetNode = document.querySelector('div[aria-label="Captions"]');

  if (targetNode) {
    // Stop any existing observers first to avoid duplicates
    if (window.captionObserver) {
      window.captionObserver.disconnect();
    }
    if (window.captionPeriodicCheck) {
      clearInterval(window.captionPeriodicCheck);
    }

    // CSS styles to be applied
    const AVATAR_STYLES = {
      'pointer-events': 'none', // Prevent avatar from blocking text selection
      'z-index': '5', // Keep visible but below the caption text
      'opacity': '1', // Ensure visibility
      'position': 'relative' // Maintain positioning in flow
    };

    const CAPTION_STYLES = {
      'pointer-events': 'auto',
      'z-index': '10',
      'user-select': 'text',
      'cursor': 'text',
      'position': 'relative' // Ensure proper stacking
    };

    // Function to apply styles with performance optimization
    const applyStylesToElement = (element, styles) => {
      Object.entries(styles).forEach(([property, value]) => {
        if (element.style.getPropertyValue(property) !== value) {
          element.style.setProperty(property, value, 'important');
        }
      });
    };

    // Function to identify caption containers by DOM structure instead of CSS classes
    const identifyCaptionContainers = (parentElement) => {
      const captionContainers = [];
      
      // Get all direct children that are divs - filtering out the "Jump to bottom" div
      const children = Array.from(parentElement.children);
      const captionBlocks = children.filter(child => {
        // Only include divs that have exactly 2 children (avatar + text)
        return child.tagName === 'DIV' && 
               child.children.length === 2 &&
               !child.querySelector('button[aria-label="Jump to most recent captions"]');
      });
      
      captionBlocks.forEach(child => {
        if (child.children.length >= 2) {
          // First child is avatar container
          const avatarOverlay = child.children[0];
          // Second child is caption text
          const captionText = child.children[1];
          
          if (avatarOverlay && captionText) {
            captionContainers.push({
              container: child,
              avatarOverlay: avatarOverlay,
              captionText: captionText
            });
          }
        }
      });
      
      return captionContainers;
    };

    // Function to verify the expected structure and warn if it changes
    const verifyStructure = () => {
      const captionContainers = identifyCaptionContainers(targetNode);
      const directChildren = Array.from(targetNode.children);
      
      console.log(`📊 Structure Analysis: Found ${directChildren.length} direct children, ${captionContainers.length} caption containers`);
      
      // Check if structure seems reasonable
      if (captionContainers.length === 0 && directChildren.length > 1) {
        console.warn('⚠️ WARNING: Caption container structure may have changed!');
        console.warn('Expected: DIV containers with 2 children (avatar + text)');
        console.warn('Current structure:');
        directChildren.forEach((child, index) => {
          console.warn(`  Child ${index + 1}: ${child.tagName} with ${child.children.length} children`);
        });
        return false;
      }
      
      return true;
    };

    // Function to style a single caption block immediately
    const styleCaptionBlock = (captionBlock) => {
      if (!captionBlock || captionBlock.nodeType !== 1) return;

      // Check if this is a caption block (should have 2 children - avatar and text)
      if (captionBlock.children.length === 2) {
        // First child is avatar container
        const avatarContainer = captionBlock.children[0];
        if (avatarContainer) {
          applyStylesToElement(avatarContainer, AVATAR_STYLES);
          
          // Also fix avatar image specifically
          const avatarImg = avatarContainer.querySelector('img');
          if (avatarImg) {
            applyStylesToElement(avatarImg, {
              'pointer-events': 'none',
              'z-index': '5', // Ensure visibility
              'opacity': '1'
            });
          }
        }
        
        // Second child is caption text container
        const captionTextContainer = captionBlock.children[1];
        if (captionTextContainer) {
          applyStylesToElement(captionTextContainer, CAPTION_STYLES);
          
          // Apply text selection to all nested elements
          const textElements = captionTextContainer.querySelectorAll('*');
          textElements.forEach(element => {
            applyStylesToElement(element, {
              'user-select': 'text',
              'pointer-events': 'auto'
            });
          });
        }
      }
    };

    const applyStyles = (container) => {
      if (!container || container.nodeType !== 1) return;
      
      // Use CSS class selectors for better performance
      const captionContainers = identifyCaptionContainers(container);
      
      captionContainers.forEach(({ container, avatarOverlay, captionText }) => {
        // Check and apply overlay styles only if not already applied
        if (avatarOverlay) {
          applyStylesToElement(avatarOverlay, AVATAR_STYLES);
          
          // Also fix avatar image specifically
          const avatarImg = avatarOverlay.querySelector('img');
          if (avatarImg) {
            applyStylesToElement(avatarImg, {
              'pointer-events': 'none',
              'z-index': '5', // Ensure visibility
              'opacity': '1'
            });
          }
        }
        
        // Check and apply caption styles only if not already applied
        if (captionText) {
          applyStylesToElement(captionText, CAPTION_STYLES);
          
          // Apply text selection to all text elements within
          const textElements = captionText.querySelectorAll('*');
          textElements.forEach(element => {
            applyStylesToElement(element, {
              'user-select': 'text',
              'pointer-events': 'auto'
            });
          });
        }
      });
    };

    // Verify structure and apply to all existing content first
    if (verifyStructure()) {
      applyStyles(targetNode);
    }

    // Enhanced mutation observer that handles specific changes for immediate styling
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check for new caption blocks added
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // If the added node is a caption block (has 2 children)
              if (node.children && node.children.length === 2 && 
                  !node.querySelector('button[aria-label="Jump to most recent captions"]')) {
                console.log('🆕 New caption block detected, applying styles immediately...');
                styleCaptionBlock(node);
              }
              // If the added node contains potential caption blocks
              else if (node.children && node.children.length > 0) {
                // Find div children with exactly 2 children (potential caption blocks)
                const potentialCaptionBlocks = Array.from(node.children).filter(child => 
                  child.tagName === 'DIV' && 
                  child.children.length === 2 &&
                  !child.querySelector('button[aria-label="Jump to most recent captions"]')
                );
                
                if (potentialCaptionBlocks.length > 0) {
                  console.log(`🆕 ${potentialCaptionBlocks.length} new caption block(s) detected, applying styles...`);
                  potentialCaptionBlocks.forEach(styleCaptionBlock);
                }
              }
            }
          });
        }
        
        // Handle attribute changes that might affect styling
        if (mutation.type === 'attributes' && mutation.target.nodeType === 1) {
          const target = mutation.target;
          // Check if this is a caption block by structure
          if (target.children && target.children.length === 2 && 
              !target.querySelector('button[aria-label="Jump to most recent captions"]')) {
            styleCaptionBlock(target);
          }
        }
      });
    });

    // Store observer globally so we can stop it if needed
    window.captionObserver = observer;

    // Observe with optimized options to catch new caption blocks immediately
    observer.observe(targetNode, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'] // Only watch for class and style changes
    });

    // Add a periodic check as a fallback (every 2 seconds)
    window.captionPeriodicCheck = setInterval(() => {
      // Find all direct children that match caption block structure but don't have styles applied
      const allPotentialBlocks = Array.from(targetNode.children).filter(child => 
        child.tagName === 'DIV' && 
        child.children.length === 2 &&
        !child.querySelector('button[aria-label="Jump to most recent captions"]')
      );
      
      // Check which ones don't have proper styling
      const unstyledBlocks = allPotentialBlocks.filter(block => 
        block.children[1] && 
        (!block.children[1].style.zIndex || block.children[1].style.zIndex !== '10')
      );
      
      if (unstyledBlocks.length > 0) {
        console.log(`⚠️ Fallback check: found ${unstyledBlocks.length} unstyled caption block(s), fixing...`);
        unstyledBlocks.forEach(captionBlock => {
          styleCaptionBlock(captionBlock);
        });
      }
    }, 2000);

    console.log('🚀 Enhanced Google Meet Caption Copy Script Activated!');
    console.log('✅ Using DOM structure detection instead of CSS classes for better reliability');
    console.log('✅ Immediate styling for new caption blocks via mutation observer');
    console.log('✅ Fallback periodic check every 2 seconds');
    console.log('✅ Applied styles to existing caption blocks');
    console.log('- Avatar overlays: visible with pointer-events: none, z-index: 5');
    console.log('- Caption text: z-index: 10, full text selection enabled');
    console.log('- Performance: optimized detection with targeted observation');

    // Return a cleanup function
    window.cleanupCaptionScript = () => {
      if (window.captionObserver) {
        window.captionObserver.disconnect();
        console.log('🛑 Caption observer stopped');
      }
      if (window.captionPeriodicCheck) {
        clearInterval(window.captionPeriodicCheck);
        console.log('🛑 Periodic check stopped');
      }
    };

  } else {
    console.log('❌ Caption container not found. Make sure you are on a Google Meet page with captions enabled.');
    // Add retry mechanism - check again after a delay
    setTimeout(() => {
      console.log('🔄 Retrying search for caption container...');
      enableCaptionCopy();
    }, 5000); // Retry after 5 seconds
  }
}

// Export the function for use as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { enableCaptionCopy };
}

// If script is run directly (not imported), execute immediately
if (typeof module === 'undefined' || !module.exports) {
  // This will run when the script is executed directly in the browser console
  enableCaptionCopy();
}