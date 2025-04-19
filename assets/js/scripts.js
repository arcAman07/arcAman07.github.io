// Main scripts for the blog
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme preference
    initTheme();
    
    // Initialize image lazy loading
    initLazyLoading();
    
    // Initialize code highlighting if Prism.js is available
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
    
    // Initialize Netlify Identity if on admin page
    if (window.location.pathname.includes('/admin')) {
      initNetlifyIdentity();
    }
  });
  
  // Theme initialization
  function initTheme() {
    // Our blog is dark-themed by default
    // But we could add a theme toggle here if needed in the future
    
    // Example of how to add a theme toggle:
    /*
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle-btn';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      if (currentTheme === 'dark') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '☀️';
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        themeToggle.innerHTML = '🌙';
        localStorage.setItem('theme', 'dark');
      }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeToggle.innerHTML = '☀️';
    }
    */
  }
  
  // Lazy loading images
  function initLazyLoading() {
    // Check if native lazy loading is supported
    if ('loading' in HTMLImageElement.prototype) {
      // Use native lazy loading
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
        img.removeAttribute('data-src');
      });
    } else {
      // Use intersection observer as fallback
      if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });
  
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(lazyImage => {
          lazyImageObserver.observe(lazyImage);
        });
      }
    }
  }
  
  // Netlify Identity for admin panel
  function initNetlifyIdentity() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add estimated reading time to posts
  function addReadingTime() {
    const postContent = document.querySelector('.post-content-area');
    if (postContent) {
      const text = postContent.textContent;
      const wordCount = text.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
      
      const readingTimeElem = document.createElement('div');
      readingTimeElem.className = 'reading-time';
      readingTimeElem.innerHTML = `<span>${readingTime} min read</span>`;
      
      const postMeta = document.querySelector('.post-meta');
      if (postMeta) {
        postMeta.appendChild(readingTimeElem);
      }
    }
  }
  
  // Run reading time calculation on post pages
  if (document.querySelector('.post-content-area')) {
    addReadingTime();
  }
  
  // Handle table of contents if present
  function initTableOfContents() {
    const headings = document.querySelectorAll('.post-content-area h2, .post-content-area h3');
    const tocContainer = document.querySelector('.table-of-contents');
    
    if (tocContainer && headings.length > 0) {
      const tocList = document.createElement('ul');
      
      headings.forEach((heading, index) => {
        // Add ID to the heading if not present
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        // Add class based on heading level
        if (heading.tagName === 'H3') {
          listItem.className = 'toc-sub-item';
        }
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
      
      tocContainer.appendChild(tocList);
    }
  }
  
  // Initialize table of contents if present
  if (document.querySelector('.table-of-contents')) {
    initTableOfContents();
  }