# Netlify Deployment Guide for Seth Sawalia Solar

This guide will walk you through deploying the Seth Sawalia Solar Company website to Netlify.

## Prerequisites

Before deploying, ensure you have:
- A GitHub account (or GitLab/Bitbucket)
- A Netlify account (sign up at https://netlify.com)
- Your Supabase project credentials (URL and Anon Key)

## Step 1: Prepare Your Repository

### 1.1 Push Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Seth Sawalia Solar website with admin dashboard"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/seth-sawalia-solar.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Environment Variables

Check your `.env` file to get your Supabase credentials:

```bash
cat .env
```

You should see:
```
VITE_SUPABASE_URL=https://aiewsoqlfaobrcqtdezd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Keep these credentials safe. You'll need them for Netlify.

## Step 2: Deploy to Netlify

### Method 1: Deploy via Netlify UI (Recommended)

1. **Log in to Netlify**
   - Go to https://app.netlify.com
   - Sign in with your GitHub account

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub repositories

3. **Select Repository**
   - Find and select your `seth-sawalia-solar` repository
   - Click on it to continue

4. **Configure Build Settings**
   - **Branch to deploy**: `main` (or your default branch)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - These should be auto-detected from `netlify.toml`

5. **Add Environment Variables**
   - Click "Show advanced" → "New variable"
   - Add the following variables:

   ```
   Variable 1:
   Key: VITE_SUPABASE_URL
   Value: https://aiewsoqlfaobrcqtdezd.supabase.co

   Variable 2:
   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZXdzb3FsZmFvYnJjcXRkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTQ5ODksImV4cCI6MjA4NjczMDk4OX0.unuoPvkdu-GvtC4ydFgTa8eMd0-jPlhl5l_D8muzF_E
   ```

6. **Deploy Site**
   - Click "Deploy site"
   - Wait for the build to complete (usually 2-5 minutes)
   - Your site will be live at a URL like: `https://random-name-123456.netlify.app`

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify**
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team
   - Enter a site name (or leave blank for random name)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   ```bash
   netlify env:set VITE_SUPABASE_URL "https://aiewsoqlfaobrcqtdezd.supabase.co"
   netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZXdzb3FsZmFvYnJjcXRkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTQ5ODksImV4cCI6MjA4NjczMDk4OX0.unuoPvkdu-GvtC4ydFgTa8eMd0-jPlhl5l_D8muzF_E"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Step 3: Configure Custom Domain (Optional)

### 3.1 Add Custom Domain

1. Go to your site in Netlify dashboard
2. Click "Domain settings"
3. Click "Add custom domain"
4. Enter your domain (e.g., `sethsawaliasolar.com`)
5. Follow the instructions to update your DNS settings

### 3.2 Enable HTTPS

- Netlify automatically provisions SSL certificates
- HTTPS will be enabled within a few minutes after domain verification

## Step 4: Configure Supabase for Production

### 4.1 Update Supabase Site URL

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "URL Configuration"
3. Add your Netlify URL to "Site URL":
   ```
   https://your-site-name.netlify.app
   ```
4. Add to "Redirect URLs":
   ```
   https://your-site-name.netlify.app/**
   ```

### 4.2 Update Email Templates (Optional)

If using email authentication:
1. Go to "Authentication" → "Email Templates"
2. Update the redirect URLs in templates to use your Netlify domain

## Step 5: Post-Deployment Setup

### 5.1 Create Admin Account

1. Visit your deployed site: `https://your-site-name.netlify.app`
2. Navigate to `/login`
3. Click "Sign Up" tab
4. Create the first account (will automatically be admin)
5. Login and access admin dashboard at `/admin`

### 5.2 Test All Features

- ✅ Homepage loads correctly
- ✅ All navigation links work
- ✅ Services page displays correctly
- ✅ Projects page displays correctly
- ✅ Contact form submits successfully
- ✅ Login/Signup works
- ✅ Admin dashboard accessible
- ✅ Real-time updates working
- ✅ Contact queries appear in admin panel

## Step 6: Continuous Deployment

Netlify automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Netlify will automatically build and deploy
```

## Troubleshooting

### Build Fails

**Error**: "Command failed with exit code 1"

**Solution**: Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly
- Check for TypeScript errors

### Environment Variables Not Working

**Error**: "Cannot read properties of undefined"

**Solution**: 
1. Go to Site settings → Environment variables
2. Verify variables are set correctly
3. Redeploy the site after adding variables

### 404 Errors on Page Refresh

**Error**: Page not found when refreshing on routes like `/services`

**Solution**: 
- This should be handled by `netlify.toml`
- Verify the redirect rule is present:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

### Supabase Connection Issues

**Error**: "Failed to fetch" or "Network error"

**Solution**:
1. Check Supabase project is active
2. Verify environment variables match Supabase dashboard
3. Check Supabase URL configuration includes Netlify domain
4. Verify RLS policies allow public access where needed

### Real-time Not Working

**Error**: Real-time subscriptions not updating

**Solution**:
1. Check browser console for WebSocket errors
2. Verify Supabase Realtime is enabled for tables
3. Check network tab for subscription connections
4. Ensure RLS policies allow SELECT on subscribed tables

## Monitoring and Analytics

### Enable Netlify Analytics

1. Go to your site dashboard
2. Click "Analytics" tab
3. Enable Netlify Analytics (paid feature)

### Monitor Build Performance

- Check "Deploys" tab for build times
- Review build logs for warnings
- Set up deploy notifications in "Settings" → "Build & deploy" → "Deploy notifications"

## Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` file to Git
- ✅ Use Netlify environment variables for secrets
- ✅ Rotate Supabase keys if exposed

### 2. Supabase Security
- ✅ Keep RLS policies enabled
- ✅ Use service role key only in Edge Functions
- ✅ Regularly review access policies

### 3. Domain Security
- ✅ Enable HTTPS (automatic with Netlify)
- ✅ Use security headers (configured in `netlify.toml`)
- ✅ Set up DNSSEC if using custom domain

## Performance Optimization

### 1. Enable Netlify Features

- **Asset Optimization**: Automatically enabled
- **Prerendering**: Configure in `netlify.toml` if needed
- **Edge Functions**: For advanced caching

### 2. Monitor Performance

- Use Lighthouse in Chrome DevTools
- Check Core Web Vitals
- Monitor Supabase query performance

## Backup and Recovery

### Database Backups

Supabase automatically backs up your database:
- Daily backups retained for 7 days (Free tier)
- Point-in-time recovery available (Pro tier)

### Code Backups

- GitHub serves as your code backup
- Netlify keeps deploy history
- Can rollback to previous deploys in Netlify dashboard

## Cost Estimation

### Netlify (Free Tier)
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS
- ✅ Continuous deployment

### Supabase (Free Tier)
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth
- ✅ 50,000 monthly active users

**Note**: Both services offer generous free tiers suitable for small to medium websites.

## Support and Resources

### Documentation
- Netlify Docs: https://docs.netlify.com
- Supabase Docs: https://supabase.com/docs
- React Router: https://reactrouter.com

### Community
- Netlify Community: https://answers.netlify.com
- Supabase Discord: https://discord.supabase.com

### Contact
For issues specific to this project:
- Email: enterprisessethsawaliya@gmail.com
- Phone: +91-7014235836

## Next Steps

After successful deployment:

1. **Content Management**
   - Add real services data via admin panel
   - Upload project portfolio
   - Customize about page content

2. **SEO Optimization**
   - Add meta tags for each page
   - Submit sitemap to Google Search Console
   - Set up Google Analytics

3. **Marketing**
   - Share website URL
   - Add to Google My Business
   - Social media integration

4. **Monitoring**
   - Set up uptime monitoring
   - Configure error tracking
   - Monitor user analytics

## Conclusion

Your Seth Sawalia Solar website is now live on Netlify with:
- ✅ Automatic HTTPS
- ✅ Continuous deployment from GitHub
- ✅ Real-time admin dashboard
- ✅ Secure authentication
- ✅ Database-backed content management

Congratulations! 🎉
