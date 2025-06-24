# Ink & Iron Tattoo Studio Website

A professional, responsive static website for a tattoo business featuring sophisticated CSS, accessibility features, and modern design principles.

## Features

### Design & Structure
- **Sophisticated CSS Architecture**: CSS custom properties, modern layout techniques (Grid & Flexbox)
- **Fixed Navigation (Desktop)**: Horizontal navigation bar with smooth hover effects
- **Dropdown Navigation (Mobile)**: Hamburger menu with slide-down animation
- **Professional Color Scheme**: Dark theme with red accents (#E53E3E) for edgy, professional look
- **Strategic Image Placement**: Background images in hero and varied layouts throughout

### Accessibility Features
- **Screen Reader Friendly**: 
  - Semantic HTML5 elements (nav, main, section, article)
  - ARIA labels and roles for interactive elements
  - Skip navigation link for keyboard users
  - Proper heading hierarchy (h1-h4)
- **Keyboard Navigation**: Full tab order support with visible focus indicators
- **Color Contrast**: WCAG AA compliant color ratios
- **Alternative Text**: Descriptive alt text for all images
- **Form Accessibility**: Labels, error messages, and help text properly associated

### Responsive Design
- **Mobile-First Approach**: Progressive enhancement from mobile to desktop
- **Breakpoints**: 768px (tablet) and 480px (mobile)
- **Touch-Friendly**: Appropriate touch targets for mobile devices
- **Flexible Typography**: Clamp() functions for scalable text

### Technical Features
- **Performance Optimized**: Efficient CSS, minimal JavaScript
- **Modern CSS**: Custom properties, smooth transitions, advanced selectors
- **Cross-Browser Compatible**: Works on all modern browsers
- **SEO Friendly**: Proper meta tags, semantic structure

## File Structure

```
tattoo_website/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Comprehensive stylesheet
├── js/
│   └── script.js           # Interactive functionality
├── images/
│   ├── artist_at_work.jpg  # Hero background image
│   ├── portrait_tattoo.jpg # About section image
│   ├── tattoo_process.jpg  # Gallery image
│   ├── detailed_work.jpg   # Gallery image
│   ├── tattoo_machine.jpg  # Gallery image
│   ├── watercolor_tattoo.jpg # Gallery image
│   ├── wolf_tattoo.jpg     # Gallery image
│   ├── full_sleeve_tattoo.jpg # Gallery image
│   ├── female_portrait_tattoo.jpg # Gallery image
│   ├── japanese_tattoo.jpg # Gallery image
│   ├── fox_tattoo.jpg      # Gallery image
│   └── map_tattoo.jpg      # Gallery image
└── README.md               # This file
```

## Setup Instructions

1. **Extract the archive**: Unzip the .tar.gz file to your desired location
2. **Open in browser**: Double-click `index.html` or open with any modern web browser
3. **Local development**: Use a local server (e.g., Live Server extension in VS Code) for best experience

## Design Specifications

### Color Palette
- **Primary**: Deep Black (#0A0A0A)
- **Secondary**: Charcoal Gray (#1A1A1A)
- **Accent**: Electric Red (#E53E3E)
- **Text Light**: Off-white (#F7F7F7)
- **Text Gray**: Medium Gray (#666666)

### Typography
- **Headers**: Oswald (Google Fonts) - Bold, modern sans-serif
- **Body**: Inter (Google Fonts) - Clean, readable sans-serif
- **Responsive Sizing**: clamp() functions for fluid typography

### Layout Strategy
- **Hero Section**: Full-screen with background image overlay
- **About Section**: Split layout (text + image) with statistics
- **Gallery Section**: Responsive grid with hover effects
- **Services Section**: Card-based layout with icons
- **Contact Section**: Solid color background (no image) with form and info
- **Footer**: Dark theme with organized links

## Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## Accessibility Compliance

- **WCAG 2.1 AA**: Color contrast, keyboard navigation, screen reader support
- **Section 508**: Government accessibility standards
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Focus Management**: Visible focus indicators and logical tab order

## Performance Features

- **Optimized Images**: Appropriate file sizes and formats
- **Efficient CSS**: Minimal redundancy, optimized selectors
- **Lazy Loading**: Images load as needed
- **Smooth Animations**: Hardware-accelerated CSS transitions

## Customization Guide

### Updating Content
- Edit text content directly in `index.html`
- Replace images in the `/images` folder (maintain same filenames)
- Update contact information in the contact section

### Styling Changes
- Modify CSS custom properties in `:root` for global changes
- Color scheme can be updated by changing the CSS variables
- Typography changes in the font imports and CSS variables

### Adding Sections
- Follow the existing semantic HTML structure
- Use consistent class naming conventions
- Maintain accessibility attributes (ARIA labels, roles)

## Image Credits

All images are sourced from copyright-free platforms:
- **Pexels**: Professional tattoo photography
- **License**: Free for commercial use, no attribution required

## Technical Notes

- **CSS Grid**: Used for complex layouts (gallery, services)
- **Flexbox**: Used for component-level layouts
- **CSS Custom Properties**: For maintainable theming
- **Intersection Observer**: For scroll-based animations
- **Form Validation**: Client-side validation with accessibility support

---

**Created**: 2024
**Version**: 1.0
**License**: Free for commercial use

For questions or customization requests, refer to the code comments in the source files.

