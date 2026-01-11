# Frederico Carneiro - Portfolio

Art Director & Lead Artist portfolio website built with Astro.

**Live site:** https://kiko-art-dev.github.io/portfolio/

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site automatically deploys to GitHub Pages when you push to the `main` branch.

### First-time GitHub Pages Setup

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Build and deployment", set **Source** to **GitHub Actions**
4. Push any change to the `main` branch to trigger the first deployment
5. Your site will be live at: https://kiko-art-dev.github.io/portfolio/

### Manual Deployment

You can also trigger a deployment manually:
1. Go to **Actions** tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Project Structure

```
src/
  components/     # Reusable UI components
  content/        # Site configuration (site-config.json)
  layouts/        # Page layouts
  pages/          # Site pages
  styles/         # Global CSS
public/
  images/         # Static images
```

## Updating Content

Edit `src/content/site-config.json` to update:
- Personal info (name, title, bio)
- Contact links (email, ArtStation, LinkedIn)
- Project details (titles, roles, descriptions)
- Expertise and tools lists

## Tech Stack

- **Framework:** Astro 5.x
- **Styling:** CSS (custom properties, no framework)
- **Fonts:** Inter (Google Fonts)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## Adding New Projects

1. Add project data to `site-config.json`
2. Create a new page in `src/pages/` (copy existing case study as template)
3. Add images to `public/images/[project-name]/`
4. Update navigation in `src/components/Header.astro`

## License

All rights reserved. Portfolio content and images are not for redistribution.
