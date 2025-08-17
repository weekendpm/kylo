# Kylo.ai - Revenue Recovery Platform (Frontend Demo)

Clean, modern frontend for AI-powered revenue recovery and billing reconciliation platform.

## 🚀 Features

- **🎯 Demo Mode**: Fully functional frontend with realistic demo data
- **🧠 Intelligent Detection**: AI-powered revenue leak detection interface
- **⚡ Smart Automation**: Automated workflow management dashboard
- **📊 Real-time Analytics**: Interactive revenue health monitoring
- **🎨 Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **📱 Multi-platform Ready**: Optimized for desktop and mobile

## 🛠️ Tech Stack

- **Next.js 14** - React framework with app router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Headless UI** - Accessible components
- **Recharts** - Data visualization
- **React Query** - Data fetching and state management

## ⚡ Quick Start

### Prerequisites
- Node.js 18+

### 1. Clone & Install
```bash
git clone https://github.com/weekendpm/kylo.git
cd kylo
npm install
```

### 2. Start Development Server
```bash
# Using the automated script
chmod +x start-dev.sh
./start-dev.sh

# Or manually
npm run dev
```

### 3. Access the Demo
- **URL**: http://localhost:3000
- **Demo Login**: `demo@demo` (any password)
- **All Features**: Fully functional with realistic demo data

## 📁 Project Structure

```
kylo/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── dashboard/       # Main dashboard pages
│   │   │   ├── detection/   # AI detection interface
│   │   │   ├── automation/  # Workflow automation
│   │   │   ├── accounts/    # Account management
│   │   │   └── ...         # Other modules
│   │   ├── login/          # Authentication
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   │   └── dashboard/      # Dashboard-specific components
│   └── lib/               # Utilities and configurations
│       ├── api.ts         # Demo API service layer
│       ├── auth-provider.tsx # Authentication context
│       └── demo-data.ts   # Realistic demo data
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

## 🎮 Demo Features

### 🔐 Authentication
- **Demo Login**: Use `demo@demo` with any password
- **Persistent Session**: Login state maintained across page reloads
- **Secure Context**: Full auth flow simulation

### 📊 Dashboard Modules

#### 🏠 **Overview**
- Revenue metrics and KPIs
- Top anomalies detection
- Interactive charts and graphs
- Quick action buttons

#### 🔍 **Detection Engine**
- AI-powered leak detection
- Confidence scoring
- Anomaly categorization
- Detection rule management

#### ⚙️ **Automation Engine**
- Workflow rule builder
- Performance analytics
- Template marketplace
- Smart action triggers

#### 📈 **Additional Modules**
- **Reconciliation**: Revenue matching and analysis
- **Accounts**: Customer account management
- **Integrations**: Third-party service connections
- **Reports**: Analytics and export tools
- **Settings**: Configuration and preferences

## 🚀 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🌐 Deployment

### Vercel (Recommended)
The project is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable for demo mode
vercel env add NEXT_PUBLIC_DEMO_MODE true
```

### Other Platforms
Standard Next.js deployment works on:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting

## 🔧 Configuration

### Environment Variables
Create `.env.local` for custom configuration:

```env
# Demo Mode (enabled by default)
NEXT_PUBLIC_DEMO_MODE=true

# App Configuration
NEXT_PUBLIC_APP_NAME=Kylo.ai
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Demo User Settings
NEXT_PUBLIC_DEMO_EMAIL=demo@demo
NEXT_PUBLIC_DEMO_NAME=Demo User
```

## 🎨 Customization

### Theme & Styling
- **Tailwind Config**: `tailwind.config.js`
- **Global Styles**: `src/app/globals.css`
- **Component Styles**: Utility classes throughout components

### Demo Data
- **Customize Demo Data**: Edit `src/lib/demo-data.ts`
- **API Responses**: Modify `src/lib/api.ts` service functions
- **User Experience**: Update demo flows in components

## 🚧 Development

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for Next.js best practices
- **Prettier**: Code formatting (configure in your editor)

### Component Architecture
- **Server Components**: Used where possible for performance
- **Client Components**: For interactive features
- **Separation**: Logic separated from presentation
- **Reusability**: Modular, reusable component design

## 📝 License

This project is proprietary software. All rights reserved.

---

**Live Demo**: [https://kylo-eight.vercel.app](https://kylo-eight.vercel.app)  
**Login**: `demo@demo` (any password)