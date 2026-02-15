# Netlify Deployment Checklist

## Pre-Deployment ✓

- [ ] Code is committed to Git
- [ ] Repository is pushed to GitHub
- [ ] `.env` file is NOT committed (in `.gitignore`)
- [ ] `netlify.toml` is present in root directory
- [ ] Build command works locally: `npm run build`
- [ ] All lint checks pass: `npm run lint`

## Netlify Setup ✓

- [ ] Netlify account created
- [ ] GitHub connected to Netlify
- [ ] Repository imported to Netlify
- [ ] Build settings configured:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Node version: 18

## Environment Variables ✓

Add these in Netlify Site Settings → Environment Variables:

- [ ] `VITE_SUPABASE_URL` = `https://aiewsoqlfaobrcqtdezd.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZXdzb3FsZmFvYnJjcXRkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTQ5ODksImV4cCI6MjA4NjczMDk4OX0.unuoPvkdu-GvtC4ydFgTa8eMd0-jPlhl5l_D8muzF_E`

## Supabase Configuration ✓

In Supabase Dashboard → Authentication → URL Configuration:

- [ ] Site URL updated to Netlify URL
- [ ] Redirect URLs includes: `https://your-site.netlify.app/**`

## Post-Deployment Testing ✓

- [ ] Site loads successfully
- [ ] All pages accessible (Home, Services, Projects, About, Resources, Contact)
- [ ] Navigation works correctly
- [ ] Contact form submits successfully
- [ ] Login page accessible at `/login`
- [ ] Can create admin account (first signup)
- [ ] Admin dashboard accessible at `/admin`
- [ ] Contact queries appear in admin panel
- [ ] Real-time updates working
- [ ] Mobile responsive design works
- [ ] HTTPS enabled (automatic)

## Optional Enhancements ✓

- [ ] Custom domain configured
- [ ] DNS settings updated
- [ ] SSL certificate verified
- [ ] Google Analytics added
- [ ] SEO meta tags optimized
- [ ] Sitemap generated
- [ ] Favicon updated
- [ ] Social media cards configured

## Maintenance ✓

- [ ] Deploy notifications configured
- [ ] Error monitoring set up
- [ ] Backup strategy documented
- [ ] Team access configured
- [ ] Documentation updated

---

## Quick Deploy Commands

### Via Netlify UI
1. Push to GitHub: `git push origin main`
2. Netlify auto-deploys

### Via Netlify CLI
```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Important URLs

- **Supabase Dashboard**: https://supabase.com/dashboard/project/aiewsoqlfaobrcqtdezd
- **Netlify Dashboard**: https://app.netlify.com
- **GitHub Repository**: [Your repo URL]
- **Live Site**: [Your Netlify URL]

## Support

- Deployment Guide: See `DEPLOYMENT_GUIDE.md`
- Admin Documentation: See `ADMIN_DOCUMENTATION.md`
- Contact: enterprisessethsawaliya@gmail.com
