# AI StackOverflow Summarizer - Frontend

Next.js 14.2 frontend for the AI StackOverflow Summarizer application.

## Features

- **Modern UI**: Beautiful, responsive design with TailwindCSS
- **URL Input**: Paste StackOverflow URLs for instant summarization
- **Question Input**: Direct technical question input with AI-powered answers
- **Real-time Chat**: Interactive follow-up questions with conversation context
- **Code Highlighting**: Syntax-highlighted code samples with copy functionality
- **Mobile Responsive**: Optimized for all device sizes
- **TypeScript**: Full type safety and better developer experience

## Tech Stack

- **Next.js 14.2**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **React Hooks**: Modern state management

## Setup

### Prerequisites

- Node.js 18+
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your backend URL
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
```

## Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles and TailwindCSS
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main page component
│   ├── components/
│   │   ├── Header.tsx       # Navigation header
│   │   ├── InputForm.tsx    # URL/question input form
│   │   ├── SummaryDisplay.tsx # Summary results display
│   │   ├── ChatInterface.tsx # Follow-up chat interface
│   │   └── LoadingSpinner.tsx # Loading indicator
│   └── api/                 # API routes (if needed)
├── package.json
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.js       # PostCSS configuration
├── env.example
└── README.md
```

## Components

### Header
Navigation component with branding and external links.

### InputForm
Dual-mode input form supporting both StackOverflow URLs and direct questions.

### SummaryDisplay
Displays AI-generated summaries with key points, code samples, and tags.

### ChatInterface
Real-time chat interface for follow-up questions with conversation context.

### LoadingSpinner
Animated loading indicator for async operations.

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Development Server

The development server runs on `http://localhost:3000` by default.

### Hot Reload

Next.js provides fast refresh for instant updates during development.

## Styling

### TailwindCSS
The project uses TailwindCSS for styling with custom configuration:

- Custom color palette
- Custom animations
- Responsive design utilities
- Component classes

### Custom Components

```css
.btn-primary    /* Primary button styling */
.btn-secondary  /* Secondary button styling */
.input-field    /* Form input styling */
.card           /* Card container styling */
.code-block     /* Code block styling */
.tag            /* Tag styling */
```

## API Integration

The frontend communicates with the backend API:

- **Summarize**: `POST /api/summarize`
- **Chat**: `POST /api/chat`

All API calls include proper error handling and loading states.

## Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Performance

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Built-in Next.js Image component
- **Font Optimization**: Google Fonts with Next.js optimization
- **Bundle Analysis**: Available with `npm run build`

## Deployment

### Vercel (Recommended)

1. **Connect GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push**

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Static export
- **Railway**: Full-stack deployment
- **AWS Amplify**: AWS integration
- **Docker**: Containerized deployment

## Environment Variables for Production

Set these in your deployment platform:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast support

## SEO

- Meta tags optimization
- Open Graph tags
- Twitter Card support
- Structured data
- Sitemap generation

## Testing

### Manual Testing

1. **URL Input**: Test with valid StackOverflow URLs
2. **Question Input**: Test with various technical questions
3. **Chat Interface**: Test follow-up questions
4. **Responsive Design**: Test on different screen sizes
5. **Error Handling**: Test with invalid inputs and network errors

### Automated Testing

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check backend server is running
   - Verify `NEXT_PUBLIC_API_URL` environment variable
   - Check CORS configuration

2. **Build Errors**
   - Clear `.next` directory
   - Reinstall dependencies
   - Check TypeScript errors

3. **Styling Issues**
   - Verify TailwindCSS configuration
   - Check PostCSS configuration
   - Clear browser cache

## License

MIT License - see LICENSE file for details 