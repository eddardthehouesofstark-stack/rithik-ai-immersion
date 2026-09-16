# StitchGrid - Garment Workforce & Peak Crunch Dispatch

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

An AI-powered workforce management system for garment manufacturing, featuring real-time line monitoring, contractor crew management, and intelligent dispatch optimization.

## 🌟 Features

- **📊 Line Monitor** - Real-time production line tracking and efficiency metrics
- **👥 Worker Directory** - Comprehensive worker database with skills and availability
- **🚀 SOS Crunch Mode** - Emergency dispatch system for peak demand periods
- **🤖 AI Line Optimizer** - Intelligent resource allocation and bottleneck detection
- **💰 Cost Calculator** - Real-time cost analysis for contractor vs in-house labor
- **📦 Contractor Crews** - Manage external workforce teams
- **🔔 Active Dispatches** - Track ongoing emergency staffing requests

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or bun
- Gemini API key from [Google AI Studio](https://ai.studio)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eddardthehouesofstark-stack/rithik-ai-immersion.git
   cd rithik-ai-immersion
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: Google Gemini API
- **Build Tool**: Vite
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── LoginPage.tsx
│   │   ├── Navbar.tsx
│   │   ├── LineMonitorView.tsx
│   │   ├── WorkerDirectoryView.tsx
│   │   ├── SOSCrunchModal.tsx
│   │   ├── AILineOptimizerView.tsx
│   │   ├── CostCalculatorView.tsx
│   │   ├── ContractorCrewsView.tsx
│   │   ├── WorkerRegistrationModal.tsx
│   │   └── ActiveDispatchesBar.tsx
│   ├── data/                # Mock data
│   │   └── mockData.ts
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── server.ts                # Express server
├── index.html               # HTML template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Key Components

### Line Monitor
Real-time tracking of production lines with efficiency metrics, bottleneck detection, and worker allocation visualization.

### Worker Directory
Searchable database of workers with:
- Skill assessments
- Availability status
- Performance ratings
- Contact information

### SOS Crunch Mode
Emergency dispatch system for handling peak demand:
- Priority selection (Normal, High, Critical)
- Required skill matching
- Estimated worker calculation
- Duration planning

### AI Line Optimizer
Powered by Google Gemini AI:
- Bottleneck identification
- Resource reallocation suggestions
- Efficiency optimization recommendations

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## 🌐 AI Studio Integration

View and manage your app in AI Studio: [https://ai.studio/apps/7a59597b-cc79-4559-aab2-077ab16acf99](https://ai.studio/apps/7a59597b-cc79-4559-aab2-077ab16acf99)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🔗 Links

- [Repository](https://github.com/eddardthehouesofstark-stack/rithik-ai-immersion)
- [AI Studio App](https://ai.studio/apps/7a59597b-cc79-4559-aab2-077ab16acf99)
- [Google Gemini API](https://ai.google.dev/)

---

Built with ❤️ using React, Vite, and Google Gemini AI
