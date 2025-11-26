# Blockchain Wire - Press Release Manager

A comprehensive web application for managing and distributing press releases through the Blockchain Wire platform. This application provides a complete workflow for creating, scheduling, and publishing press releases with support for multiple distribution circuits, user management, and account administration.

## Features

### Press Release Management
- **Multi-step Release Creation**: Guided workflow through 6 steps:
  1. Distribution - Select from various circuit options (Wire, Specialty, Individual, International)
  2. Content - Rich text editor with formatting tools, headline/subheadline, location
  3. Optimization - SEO and content optimization
  4. Schedule - Calendar-based scheduling with timezone support
  5. Review - Final review before submission
  6. Checkout - Payment processing with promo code support

- **Release Listing**: View all press releases with filtering, status tracking, and management options

### Account Management
- **Multi-Account Support**: Switch between primary and secondary accounts
- **Unified Accounts Page**: View all accounts, switch between them, and manage account details
- **Primary Account Registration**: Full 5-step registration wizard for new primary accounts:
  1. Company Information - Basic company details, address, phone
  2. Additional Company Information - Website, industry, stock exchange info, logo upload
  3. Primary Contact - Contact person details, email, password creation
  4. Billing Contact - Billing details with "same as primary" option, login access
  5. Terms & Conditions - Legal agreement with expandable sections, reCAPTCHA
- **Secondary Account Addition**: Simplified 2-step flow for adding secondary accounts:
  1. Account Type Selection - Answer questions to determine account type
  2. Account Details - Company information form (no password/billing needed)
- **Account Settings**: Comprehensive settings for company information, contact details, and preferences

### User Management
- **User Administration**: Add and manage users across accounts
- **Role-based Access**: Support for primary/admin users and regular users
- **User Listing**: View all users with quick actions

### E-commerce Features
- **Promo Code System**: Track and manage promotional codes with discount tracking
- **Payment Integration**: Secure checkout with support for Visa, Mastercard, and American Express
- **Crypto Payment Option**: Alternative payment method for press releases

### Rich Text Editing
- **Tiptap Editor**: Full-featured WYSIWYG editor with:
  - Text formatting (bold, italic, underline)
  - Text alignment (left, center, right, justify)
  - Lists (bulleted and numbered)
  - Links and images
  - Color customization
  - Undo/redo functionality

### File Management
- **Logo Upload**: Upload company logos with drag-and-drop support (JPG/PNG, max 256KB)
- **Attachment Support**: Attach files to press releases (max 40MB)
- **File Preview**: Visual preview of uploaded files before submission

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Routing**: React Router DOM 7.9.6
- **Styling**: Tailwind CSS 3.4.18
- **Rich Text Editor**: Tiptap 3.11.0
- **Icons**: Lucide React 0.554.0
- **CSS Processing**: PostCSS with Autoprefixer

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blockchain-wire
```

2. Install dependencies:
```bash
npm install
```

Note: If you encounter peer dependency conflicts, use:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

### Development Server

The development server runs on port 3000 by default and is accessible from all network interfaces (`0.0.0.0`). This allows you to access the application from other devices on your network.

### Project Structure

```
blockchain-wire/
├── components/          # Reusable UI components
│   ├── ui/             # UI primitives (Button, PaymentLogos)
│   ├── Header.tsx      # Global header component
│   ├── Footer.tsx      # Global footer component
│   └── Sidebar.tsx     # Navigation sidebar
├── pages/              # Page components
│   ├── PressRelease/   # Press release pages
│   │   ├── NewRelease.tsx
│   │   ├── ListReleases.tsx
│   │   └── steps/      # Multi-step form components
│   ├── Account/        # Account management
│   ├── Users/          # User management
│   ├── PromoCode/      # Promo code management
│   └── Settings/        # Account settings
├── public/             # Static assets
│   ├── cards/          # Payment card logos
│   └── logos/           # Application logos
├── constants.ts        # Application constants and mock data
├── types.ts            # TypeScript type definitions
├── index.css           # Global styles and Tailwind imports
├── tailwind.config.cjs # Tailwind CSS configuration
├── postcss.config.cjs  # PostCSS configuration
└── vite.config.ts      # Vite configuration
```

## Application Routes

- `/` - Redirects to `/releases/add`
- `/releases/add` - Create a new press release
- `/releases` - List all press releases
- `/account` - Unified accounts page (view all accounts, switch, add new)
- `/account/add` - Add a new secondary account (simplified flow)
- `/register` - Primary account registration (full 5-step wizard)
- `/users` - View all users
- `/users/add` - Add a new user
- `/promos` - View promo code history
- `/settings` - Account settings

## Key Features Breakdown

### Distribution Circuits

The application supports multiple distribution circuit types:

- **Wire Circuits**: Basic SEO, Pro, Elite, Premium
- **Specialty Circuits**: Metal-based tiers (Copper, Silver, Gold, Platinum, Diamond)
- **Individual Circuits**: Targeted distribution options
- **International Circuits**: Global distribution with flat-rate pricing

Each circuit includes detailed information about distribution channels, traffic statistics, turnaround times, and pricing.

### Scheduling System

- Interactive calendar component for date selection
- Time picker with 12/24-hour format support
- Timezone selection (US Eastern, Pacific, Central, Mountain, UTC)
- Operating hours notice (7 AM - 7 PM ET, Monday-Friday)

### Payment Processing

- Card number formatting and validation
- Expiration date formatting (MM/YY)
- CVC and ZIP code validation
- Promo code application with automatic discount calculation
- Support for multiple payment methods (Credit Card, Crypto)

### Contact Information Management

- Flexible contact display preferences:
  - Full contact information
  - Hide email (contact form only)
  - Hide all contact information
- Comprehensive contact form with validation
- Support for multiple phone numbers and contact methods

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized build will be output to the `dist/` directory. To preview the production build:

```bash
npm run preview
```

## Deployment

### Vercel Deployment

This application is optimized for deployment on Vercel. The project includes:

- **Optimized Configuration**: `vercel.json` with security headers, caching, and compression
- **HashRouter**: Uses hash-based routing for seamless SPA deployment
- **Base Path**: Configured for `/blockchainwire/` subdirectory deployment
- **Node.js Version**: Specified in `.nvmrc` (18.20.0) and `package.json` engines

#### Quick Deploy to Vercel

1. **Connect Repository**:
   - Import your Git repository to Vercel
   - Vercel will auto-detect the Vite configuration

2. **Configure Project Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
   - **Node.js Version**: 18.20.0 (from `.nvmrc`)

3. **Deploy**:
   - Click "Deploy" - Vercel will build and deploy automatically
   - The application will be available at your Vercel domain

#### Deployment Features

- **Security Headers**: XSS protection, frame options, content type options
- **Caching**: Static assets cached for 1 year, HTML always fresh
- **Compression**: Automatic gzip/brotli compression enabled
- **Performance**: Optimized build output with asset hashing

#### Environment Variables

Currently, no environment variables are required. The application uses:
- `import.meta.env.BASE_URL` - Automatically set by Vite based on `base` config
- Mock data for demonstration purposes

If you need to add environment variables in the future:
1. Add them in Vercel project settings
2. Prefix with `VITE_` for Vite to expose them (e.g., `VITE_API_URL`)
3. Access via `import.meta.env.VITE_API_URL`

#### Custom Domain

To deploy to a custom domain:
1. Add your domain in Vercel project settings
2. Update `base` in `vite.config.ts` if needed (currently `/blockchainwire/`)
3. Redeploy

#### Troubleshooting

- **Build Fails**: Check Node.js version matches `.nvmrc` (18.20.0)
- **Routes Not Working**: Verify HashRouter is used (already configured)
- **Assets Not Loading**: Check `base` path matches deployment path
- **404 Errors**: Ensure `outputDirectory` is set to `dist` in `vercel.json`

## Configuration

### Tailwind CSS

The project uses Tailwind CSS with a custom theme configuration. Theme colors are defined in `tailwind.config.cjs`:

- **Primary**: `#35BACF` (with hover and light variants)
- **Secondary**: Black, dark, medium, light, and white variants

### Vite Configuration

The Vite configuration includes:
- React plugin for JSX/TSX support
- Path alias `@` pointing to the project root
- Server configuration (port 3000, host 0.0.0.0)

## Browser Support

The application is designed to work in modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Fetch API

## Notes

- The application currently uses mock data for demonstration purposes
- File uploads are validated client-side (logo: 256KB max, attachments: 40MB max)
- Payment processing is simulated in the current implementation
- The rich text editor content is stored as HTML

## License

[Add your license information here]

## Support

For issues, questions, or contributions, please [add your support contact information or repository links].

