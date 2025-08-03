# ParsePath - AI-Powered Resume Parser

A modern, beautiful web application for parsing resumes and extracting key information using AI technology.

## ✨ Features

- **🎨 Beautiful UI/UX**: Modern, responsive design with smooth animations
- **🌙 Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- **📁 Drag & Drop Upload**: Easy file upload with drag and drop support
- **🤖 AI-Powered Parsing**: Advanced AI technology for accurate information extraction
- **📊 Structured Results**: Clean, organized display of parsed information
- **⚡ Fast & Responsive**: Optimized performance with loading states
- **📱 Mobile Friendly**: Fully responsive design for all devices

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Theme Management**: next-themes
- **File Upload**: react-dropzone
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animations

## 🎯 What Gets Extracted

- **Personal Information**: Name, email, phone number
- **Skills**: Technical and soft skills
- **Work Experience**: Job history with company names and dates
- **Education**: Academic background and qualifications

## 🎨 Design Features

### Theme System
- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Modern, eye-friendly interface
- **System Preference**: Automatically matches your OS theme
- **Smooth Transitions**: Elegant theme switching animations

### Visual Enhancements
- **Gradient Accents**: Beautiful gradient effects throughout the interface
- **Hover Effects**: Interactive elements with smooth hover animations
- **Loading States**: Professional loading indicators
- **Card-based Layout**: Clean, organized information display
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd parse-path
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── FileUpload.tsx      # File upload component
│   ├── ParsedResults.tsx   # Results display component
│   ├── FeatureCard.tsx     # Feature showcase cards
│   └── Header.tsx          # Navigation header
├── hooks/
│   ├── use-theme.ts        # Theme management hook
│   └── use-toast.ts        # Toast notifications
├── pages/
│   ├── Index.tsx           # Main application page
│   └── NotFound.tsx        # 404 page
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Customization

### Colors
The application uses CSS custom properties for theming. You can customize colors in `src/index.css`:

```css
:root {
  --primary: 217 91% 60%;        /* Primary brand color */
  --background: 0 0% 100%;       /* Light theme background */
  --foreground: 240 10% 3.9%;    /* Light theme text */
}

.dark {
  --background: 240 10% 3.9%;    /* Dark theme background */
  --foreground: 0 0% 98%;        /* Dark theme text */
}
```

### Components
All UI components are built with shadcn/ui and can be customized through Tailwind CSS classes.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Vite](https://vitejs.dev/) for the fast build tool
