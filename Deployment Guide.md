# Deployment Guide

This guide covers deploying the Evidence Timeline Builder to various platforms.

## 🚀 GitHub Pages Deployment

### Prerequisites
- GitHub repository
- GitHub Pages enabled
- `gh-pages` package installed (already included)

### Automatic Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   pnpm run deploy
   ```

3. **Access your site**:
   Your site will be available at: `https://yourusername.github.io/evidence-timeline-builder`

### Manual GitHub Pages Setup

1. **Build the project**:
   ```bash
   pnpm run build
   ```

2. **Deploy to gh-pages branch**:
   ```bash
   pnpm run deploy
   ```

3. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Select "/ (root)" folder
   - Save settings

## 🌐 Other Deployment Options

### Netlify

1. **Connect Repository**:
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `pnpm run build`
   - Set publish directory: `dist`

2. **Deploy**:
   - Netlify will automatically deploy on every push
   - Custom domain available with free plan

### Vercel

1. **Connect Repository**:
   - Sign up at [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

2. **Deploy**:
   - Automatic deployments on every push
   - Preview deployments for pull requests

### Static File Hosting

1. **Build the project**:
   ```bash
   pnpm run build
   ```

2. **Upload `dist` folder**:
   - Upload the entire `dist` folder to your web server
   - Ensure your server serves `index.html` for all routes
   - Configure HTTPS for security

## 🔧 Configuration for Production

### Environment Setup

No environment variables are required as the application runs entirely client-side.

### Performance Optimization

The build is already optimized with:
- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Unused code removal
- **Minification**: CSS and JavaScript minification
- **Compression**: Gzip compression recommended

### Security Headers

For enhanced security, configure these headers on your server:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Build Analysis

### Bundle Size
- **HTML**: ~0.5 KB (0.3 KB gzipped)
- **CSS**: ~88 KB (14 KB gzipped)
- **JavaScript**: ~346 KB (108 KB gzipped)

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🔍 Troubleshooting

### Common Issues

1. **404 Errors on Refresh**:
   - Configure your server to serve `index.html` for all routes
   - For GitHub Pages, this is handled automatically

2. **Assets Not Loading**:
   - Check the `base` configuration in `vite.config.js`
   - Ensure the correct repository name is set

3. **Build Failures**:
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check Node.js version compatibility (18+)

### GitHub Pages Specific

1. **Custom Domain**:
   - Add `CNAME` file to `public` folder with your domain
   - Configure DNS records with your domain provider

2. **HTTPS**:
   - GitHub Pages automatically provides HTTPS
   - Enforce HTTPS in repository settings

## 📈 Monitoring

### Analytics
- Add Google Analytics or similar tracking
- Monitor user engagement and feature usage
- Track export functionality usage

### Error Monitoring
- Consider adding Sentry or similar error tracking
- Monitor client-side errors and performance issues

## 🔄 Updates and Maintenance

### Updating Dependencies
```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Test after updates
pnpm run build && pnpm run preview
```

### Version Management
- Use semantic versioning for releases
- Tag releases in Git for easy rollbacks
- Maintain changelog for user-facing changes

---

**Need help with deployment? Check the main README or open an issue on GitHub.**

