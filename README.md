# 🚀 Advanced Coming Soon Page

A stunning, feature-rich "Coming Soon" page built with Next.js 14, TypeScript, and advanced CSS animations.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 Visual Effects

- **Animated Background Grid** - Dynamic moving grid lines
- **Floating Gradient Shapes** - Ambient background animations
- **Pulse Rings** - Animated rings around the logo
- **Particle System** - 30 floating particles with randomized animations
- **Gradient Text** - Animated gradient shift on title
- **Glassmorphism Design** - Modern frosted glass effect

### 🎯 Interactive Components

- **Feature Cards** - Hover effects with smooth transitions
- **Email Subscription Form** - With form validation and state management
- **Loading States** - Animated spinner during submission
- **Success Feedback** - Checkmark animation with auto-dismiss
- **Progress Bar** - Animated development progress indicator
- **Social Media Links** - Hover tooltips and brand-specific colors

### 📱 Responsive Design

- Fully responsive across all devices
- Mobile-optimized layouts
- Touch-friendly interactive elements
- Adaptive font sizes and spacing

### ⚡ Performance

- Next.js App Router for optimal performance
- CSS-only animations (no heavy JavaScript)
- Optimized particle rendering
- Smooth 60fps animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Color Scheme

Edit the CSS variables in [`app/globals.css`](app/globals.css:8):

```css
:root {
  --primary-color: #6366f1; /* Primary brand color */
  --secondary-color: #8b5cf6; /* Secondary brand color */
  --accent-color: #ec4899; /* Accent color */
  --background-dark: #0f172a; /* Dark background */
  --background-light: #1e293b; /* Light background */
  --surface: #334155; /* Surface elements */
  --text-primary: #f8fafc; /* Primary text */
  --text-secondary: #94a3b8; /* Secondary text */
  --success: #10b981; /* Success state */
}
```

### Update Features

Modify the feature cards in [`app/page.tsx`](app/page.tsx:58):

```tsx
<div className="features">
  <div className="feature-card">
    <div className="feature-icon">⚡</div>
    <h3>Your Feature Title</h3>
    <p>Your feature description</p>
  </div>
  {/* Add more feature cards */}
</div>
```

### Progress Bar

Change the development progress in [`app/page.tsx`](app/page.tsx:118):

```tsx
<div className="progress-fill" style={{ width: "75%" }}>
  {/* Change "75%" to your desired progress */}
</div>
```

### Social Media Links

Update social links in [`app/page.tsx`](app/page.tsx:128):

```tsx
<a
  href="https://twitter.com/yourhandle"
  className="social-icon twitter"
  data-tooltip="@yourhandle"
>
  {/* SVG icon */}
</a>
```

### Email Form Handler

Implement actual email submission in [`app/page.tsx`](app/page.tsx:10):

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Add your email API endpoint here
  const response = await fetch("/api/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};
```

### Particle Count

Adjust particle density in [`app/page.tsx`](app/page.tsx:204):

```tsx
{[...Array(30)].map((_, i) => (
  // Change 30 to increase/decrease particles
))}
```

## 📦 Project Structure

```
laaps/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main coming soon page
│   └── globals.css      # Global styles and animations
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── next.config.js       # Next.js config
└── README.md           # Documentation
```

## 🎭 Animation Details

### Implemented Animations

- **Fade In/Out** - Smooth content entrance
- **Float** - Gentle hovering effect on logo
- **Pulse** - Expanding rings animation
- **Gradient Shift** - Animated color transitions
- **Particle Float** - Vertical particle movement
- **Grid Move** - Animated background grid
- **Shape Float** - Ambient background movement
- **Bounce** - Feature icon animations
- **Shimmer** - Progress bar highlight
- **Spin** - Loading spinner rotation

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.3
- **Styling:** Pure CSS3 with CSS Variables
- **Font:** Inter (Google Fonts)
- **Icons:** Custom SVG icons

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Use Cases

- Product launches
- Website under construction
- App pre-registration
- Event announcements
- Beta signups
- Marketing campaigns

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 💡 Tips

1. **Performance:** Keep particle count reasonable on mobile devices
2. **Accessibility:** Ensure color contrast meets WCAG standards
3. **SEO:** Update metadata in [`app/layout.tsx`](app/layout.tsx:6)
4. **Analytics:** Add tracking to the email form for conversion metrics
5. **Email Service:** Integrate with services like Mailchimp, ConvertKit, or SendGrid

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

---

Made with ❤️ using Next.js
