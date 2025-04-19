// Custom Analytics for Blog
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tracking
    initPageViewTracking();
    initHighlightTracking();
    initTimeOnPageTracking();
    initScrollDepthTracking();
  });
  
  // Track page views
  function initPageViewTracking() {
    // We'll use a combination of Google Analytics and our custom tracking
    const pageData = {
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    };
    
    // Send to our custom analytics endpoint
    sendAnalyticsData('pageview', pageData);
  }
  
  // Track text highlighting
  function initHighlightTracking() {
    document.addEventListener('mouseup', function() {
      const selection = window.getSelection();
      if (!selection.toString().trim()) return;
      
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      
      // Only track highlights in the content area
      if (document.querySelector('.post-content-area') && 
          document.querySelector('.post-content-area').contains(container.parentNode)) {
        
        const highlightData = {
          text: selection.toString(),
          path: window.location.pathname,
          title: document.title,
          timestamp: new Date().toISOString()
        };
        
        // Highlight the text visually (optional)
        const span = document.createElement('span');
        span.className = 'highlighted-text';
        try {
          range.surroundContents(span);
        } catch (e) {
          // Sometimes surroundContents fails if selection crosses element boundaries
          console.error('Highlighting error:', e);
        }
        
        // Send to our custom analytics endpoint
        sendAnalyticsData('highlight', highlightData);
      }
    });
  }
  
  // Track time on page
  function initTimeOnPageTracking() {
    let startTime = new Date();
    let hasRecorded = false;
    
    // Record time when leaving the page
    window.addEventListener('beforeunload', function() {
      if (hasRecorded) return;
      
      const timeSpent = (new Date() - startTime) / 1000; // in seconds
      const timeData = {
        path: window.location.pathname,
        title: document.title,
        timeSpent: timeSpent,
        timestamp: new Date().toISOString()
      };
      
      // Using sendBeacon for reliable data sending during page unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', JSON.stringify({
          type: 'timeOnPage',
          data: timeData
        }));
      } else {
        // Fallback to sync XHR if sendBeacon is not supported
        sendAnalyticsData('timeOnPage', timeData, true);
      }
      
      hasRecorded = true;
    });
    
    // Also record time if user switches tabs/minimizes
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden' && !hasRecorded) {
        const timeSpent = (new Date() - startTime) / 1000;
        const timeData = {
          path: window.location.pathname,
          title: document.title,
          timeSpent: timeSpent,
          timestamp: new Date().toISOString(),
          incomplete: true
        };
        
        sendAnalyticsData('timeOnPage', timeData);
        
        // Reset timer when user comes back
        startTime = new Date();
      }
    });
  }
  
  // Track scroll depth
  function initScrollDepthTracking() {
    let maxScroll = 0;
    let segments = [25, 50, 75, 100];
    let segmentsReached = new Set();
    
    window.addEventListener('scroll', debounce(function() {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Check if user has scrolled to new segment
        for (const segment of segments) {
          if (scrollPercentage >= segment && !segmentsReached.has(segment)) {
            segmentsReached.add(segment);
            
            const scrollData = {
              path: window.location.pathname,
              title: document.title,
              scrollDepth: segment,
              timestamp: new Date().toISOString()
            };
            
            sendAnalyticsData('scrollDepth', scrollData);
          }
        }
      }
    }, 100));
  }
  
  // Helper function: Debounce
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  // Send analytics data to server
  function sendAnalyticsData(type, data, sync = false) {
    // For now, we'll log to console. In production, replace this with an actual API call
    console.log('Analytics:', type, data);
    
    // In a real implementation, you would send this data to your backend API
    // Example:
    /*
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/analytics', !sync);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      type: type,
      data: data
    }));
    */
    
    // For GitHub Pages, you might use a third-party service or a custom serverless function
    // This is where you would integrate with your chosen analytics solution
  }