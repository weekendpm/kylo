# Kylo Design System (KDS)

## Overview
The Kylo Design System (KDS) is a comprehensive design framework for the revenue recovery platform. It provides consistent styling, components, and patterns for building a professional, dark-themed financial application.

## Design Principles

### 1. Professional Financial Interface
- Dark theme optimized for extended use
- High contrast for data readability
- Monospace fonts for numerical data
- Clean, minimal aesthetic

### 2. Data-First Design
- Tables and charts are primary UI elements
- Clear hierarchy with proper spacing
- Status indicators for quick scanning
- Interactive elements for data exploration

### 3. Consistent Interaction Patterns
- Hover states for all interactive elements
- Loading states for async operations
- Clear visual feedback for actions
- Keyboard navigation support

## Color System

### Core Colors
```css
--primary: #3b82f6        /* Blue - Primary actions */
--primary-light: #60a5fa  /* Light blue - Hover states */
--primary-dark: #1d4ed8   /* Dark blue - Active states */
--accent: #8b5cf6         /* Purple - Secondary actions */
--success: #10b981        /* Green - Success states */
--warning: #f59e0b        /* Yellow - Warning states */
--danger: #ef4444         /* Red - Error states */
```

### Background Colors
```css
--bg-primary: #0a0a0a     /* Main background */
--bg-secondary: #111111   /* Sidebar background */
--bg-tertiary: #1a1a1a    /* Form inputs, secondary surfaces */
--bg-card: #161616        /* Card backgrounds */
--bg-elevated: #1f1f1f    /* Elevated elements */
```

### Text Colors
```css
--text-primary: #ffffff   /* Primary text */
--text-secondary: #a3a3a3 /* Secondary text */
--text-tertiary: #737373  /* Tertiary text */
--text-muted: #525252     /* Muted text */
```

### Border Colors
```css
--border-primary: #262626   /* Primary borders */
--border-secondary: #404040 /* Secondary borders */
--border-accent: rgba(59, 130, 246, 0.3) /* Accent borders */
```

## Typography

### Font Families
- **Primary**: Inter (UI text, labels, headers)
- **Monospace**: JetBrains Mono (numerical data, codes)

### Font Weights
- 300: Light
- 400: Regular  
- 500: Medium
- 600: Semi-bold
- 700: Bold

### Text Scale
- Header 1: 28px/700 weight
- Header 2: 24px/600 weight
- Header 3: 18px/600 weight
- Body: 14px/500 weight
- Small: 12px/500 weight
- Tiny: 11px/500 weight

## Layout System

### Grid System
- **4-column grid** for KPI cards
- **12-column grid** for complex layouts
- **24px gap** between grid items
- **32px padding** for page containers

### Spacing Scale
```css
4px   /* xs - tight spacing */
8px   /* sm - compact spacing */
12px  /* md - default spacing */
16px  /* lg - comfortable spacing */
24px  /* xl - loose spacing */
32px  /* 2xl - section spacing */
48px  /* 3xl - page spacing */
```

## Component Library

### 1. Buttons (.btn, .btn-primary, .btn-secondary)
```css
/* Usage: Primary actions like "Run Analysis" */
.btn-primary
/* Usage: Secondary actions like "Export" */
.btn-secondary
/* Usage: Small buttons in tables */
.btn-sm
```

### 2. Cards (.card, .summary-card, .metric-card)
```css
/* Usage: General content containers */
.card
/* Usage: KPI summary displays */
.summary-card
/* Usage: Metric displays with hover effects */
.metric-card
```

### 3. Form Elements
```css
/* Usage: Dropdown selectors */
.form-select
/* Usage: Text inputs */
.form-input
/* Usage: Checkboxes */
.form-checkbox
```

### 4. Status Indicators
```css
/* Usage: Severity levels */
.status-critical, .status-high, .status-medium, .status-low
/* Usage: Process states */
.status-active, .status-paused, .status-pending, .status-confirmed
```

### 5. Data Tables (.data-table)
```css
/* Usage: All tabular data displays */
.data-table th /* Table headers */
.data-table td /* Table cells */
.data-table tr:hover /* Row hover states */
```

### 6. Navigation (.sidebar, .nav-item)
```css
/* Usage: Main sidebar navigation */
.sidebar
.nav-section /* Navigation groups */
.nav-item /* Individual nav links */
.nav-item.active /* Active nav state */
```

## Component Patterns

### 1. Page Layout
```tsx
<div className="page-container">
  <div className="page-header">
    <div>
      <h1 className="page-title">Page Title</h1>
      <p className="text-gray-600">Page description</p>
    </div>
    <div className="flex items-center gap-4">
      {/* Actions */}
    </div>
  </div>
  {/* Page content */}
</div>
```

### 2. KPI Cards Grid
```tsx
<div className="grid grid-cols-4 gap-6 mb-8">
  <KPICard title="Metric" value={123} format="currency" />
</div>
```

### 3. Data Table with Actions
```tsx
<div className="card">
  <div className="overflow-x-auto">
    <table className="w-full">
      {/* Table content */}
    </table>
  </div>
</div>
```

### 4. Status Badge
```tsx
<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
  Critical
</span>
```

## Animation & Transitions

### Standard Timing
- **Fast**: 0.2s - Hover states, button interactions
- **Medium**: 0.3s - Card hovers, modal appearances
- **Slow**: 0.8s - Page transitions, data loading

### Easing Functions
- **Default**: cubic-bezier(0.4, 0, 0.2, 1)
- **Bounce**: cubic-bezier(0.68, -0.55, 0.265, 1.55)

## Shadows & Effects

### Shadow System
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-glow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(59, 130, 246, 0.12)
```

### Glow Effects
- Used on active/focused elements
- Subtle blue glow for interactive states
- Applied to cards on hover

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px)

/* Tablet */
@media (max-width: 1200px)

/* Desktop */
@media (min-width: 1201px)
```

## Usage Guidelines

### Do's
✅ Use consistent spacing from the scale
✅ Apply proper contrast ratios for text
✅ Use monospace fonts for numerical data
✅ Implement hover states for interactive elements
✅ Use semantic color meanings (red=danger, green=success)

### Don'ts
❌ Mix custom colors outside the defined palette
❌ Use different font families than specified
❌ Skip hover states on interactive elements
❌ Use inconsistent border radius values
❌ Apply different transition timings

## Component Examples

### KPI Card Implementation
```tsx
<div className="summary-card">
  <div className="summary-icon bg-blue-500/10">
    <Icon className="w-6 h-6 text-blue-400" />
  </div>
  <div className="summary-content">
    <div className="summary-value">$427,850</div>
    <div className="summary-label">Recoverable Revenue</div>
    <div className="summary-change text-success">+15.2% vs last month</div>
  </div>
</div>
```

### Data Table Row
```tsx
<tr className="hover:bg-gray-50/5">
  <td className="px-4 py-4">
    <div className="text-sm font-medium text-white">Acme Corp</div>
  </td>
  <td className="px-4 py-4 text-right">
    <span className="font-mono text-white">$2,500</span>
  </td>
  <td className="px-4 py-4">
    <span className="status-critical">Critical</span>
  </td>
</tr>
```

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text

### Interactive Elements
- All buttons have focus states
- Keyboard navigation supported
- Screen reader friendly markup

---

**KDS Version**: 1.0  
**Last Updated**: January 2024  
**Maintained by**: Kylo.ai Team
