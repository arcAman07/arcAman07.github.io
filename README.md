# My Personal Blog

A feature-rich blog website with a dark theme, browser-based editing, and analytics, powered by Jekyll and GitHub Pages.

## Features

- **Clean, Dark-Themed Design**: Modern aesthetic with responsive design for all devices
- **Browser-Based Editing**: Write and publish content directly from the web interface using Netlify CMS
- **Tag-Based Organization**: Categorize and filter posts by tags
- **Rich Content Editing**: Easy image uploads, formatting, and templates
- **Advanced Analytics**: Track page views, reading time, scroll depth, and even text highlighting
- **SEO Optimized**: Built with best practices for search engines

## Setup Instructions

### 1. Prerequisites

- GitHub account
- [Git](https://git-scm.com/) installed on your computer
- Ruby and Jekyll (for local development, optional)

### 2. Fork/Clone this Repository

```bash
git clone https://github.com/yourusername/my-blog.git
cd my-blog
```

### 3. GitHub Pages Setup

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Set Source to "GitHub Actions"
4. Click "Configure" for the Jekyll workflow

### 4. Configure Analytics

1. Replace the placeholder Google Analytics ID in `_layouts/default.html`
2. Set up a backend for the custom analytics (optional)

### 5. Netlify CMS Setup

1. Sign up for a [Netlify](https://www.netlify.com/) account
2. Connect your GitHub repository to Netlify
3. Enable Netlify Identity and Git Gateway

### 6. Configure Your Blog

1. Update `_config.yml` with your information
2. Replace placeholder images in `/assets/images/`
3. Update `about.md` with your bio

### 7. Local Development (Optional)

```bash
# Install dependencies
gem install bundler jekyll

# Install project dependencies
bundle install

# Start local server
bundle exec jekyll serve
```

## Writing Content

### Using the Web Interface

1. Navigate to `yourblog.com/admin`
2. Sign in with your Netlify Identity credentials
3. Create a new post or edit existing content
4. Use the rich editor to format text, add images, etc.
5. Save and publish when ready

### Using Templates

1. In the admin interface, select a template from the dropdown
2. The template will pre-fill fields and provide structure
3. Customize as needed

### Adding Images

1. Use the image upload button in the editor
2. Drag and drop images into the designated area
3. Images will be automatically optimized and stored in the repository

## Customization

### Changing Colors

Edit the CSS variables in `assets/css/main.css`:

```css
:root {
  --background: #121212;
  --surface: #1e1e1e;
  --primary: #bb86fc;
  /* other colors */
}
```

### Adding New Templates

Add new templates in `admin/index.html` by extending the templates array:

```javascript
const templates = [
  // existing templates
  {
    name: 'your-template-name',
    label: 'Your Template Name',
    fields: [
      // Define fields
    ]
  }
];
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.