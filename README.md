# Shopstr Bitcoin Username Registration

A web application for registering Bitcoin usernames with BOLT12 offers on the `nitishjha.space` domain. This application integrates with a Greenlight API for BOLT12 offer generation and allows users to register Bitcoin usernames.

## Features

- Bitcoin username registration with custom domain
- BOLT12 offer generation through Greenlight API
- Configurable expiration times for offers
- Modern, responsive UI with lightning theme
- Static site deployment

## Environment Configuration

Create a `.env` file at the root of the project based on the `.env.example`:

```bash
# API configuration
NEXT_PUBLIC_GREENLIGHT_API_URL=https://example-api-url.com

# Cloudflare configuration
CLOUDFLARE_API_KEY=your_cloudflare_api_key
CLOUDFLARE_ZONE_ID=your_cloudflare_zone_id
DOMAIN=example.com
```

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Production Build

```bash
# Create a production build (static export)
npm run build

# Serve the static files
npm start
```

The application is configured for static export with Next.js, which means it generates HTML/CSS/JS files that can be served from any static file server, including GitHub Pages.

## Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment. When you push to the main branch, it will automatically deploy to GitHub Pages.

### Custom Server

If you want to serve the application from a custom server:

1. Build the application: `npm run build`
2. Copy the contents of the `out` directory to your server
3. Configure your server to serve static files from this directory

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - UI library

## API Integration

The application integrates with two APIs:
1. Greenlight API - For generating BOLT12 offers
2. Username API - For registering Bitcoin usernames

These endpoints are configured through environment variables.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
