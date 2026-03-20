# DM3Trades

Professional trading insights and market analysis platform.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- App Router
- MDX for blog posts
- Zod for form validation
- Resend for email

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd ~/Desktop/Development/dm3trades
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Copy `.env.example` to `.env.local` and add your API keys:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual API keys:
- `FINNHUB_API_KEY` - Get free key at https://finnhub.io/
- `RESEND_API_KEY` - Get free key at https://resend.com/

### Development Server

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
dm3trades/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── contact/      # Contact form API
│   │   └── market-snapshot/ # Market data API
│   ├── insights/          # Blog listing & posts
│   ├── terminal/         # AI Terminal page
│   ├── tools/            # Trading tools page
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── academy/          # Redirect to academy
├── components/           # Reusable React components
├── content/insights/     # MDX blog posts
├── lib/                  # Types and utilities
├── services/             # External API services
└── public/               # Static assets
```

## Routes

- `/` - Homepage with market snapshot
- `/insights` - Blog listing
- `/insights/[slug]` - Individual blog post
- `/terminal` - AI Market Terminal
- `/tools` - Trading tools
- `/about` - About DM3Trades
- `/contact` - Contact form
- `/academy` - Redirect to trading academy

## Environment Variables

| Variable | Description |
|----------|-------------|
| `FINNHUB_API_KEY` | Finnhub API key for market data |
| `RESEND_API_KEY` | Resend API key for email sending |

## License

All rights reserved.
