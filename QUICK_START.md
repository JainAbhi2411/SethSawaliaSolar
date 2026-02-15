# Quick Start: Deploy to Netlify in 5 Minutes

## Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Seth Sawalia Solar - Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Netlify (2 minutes)

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select your repository
5. Click **"Show advanced"** and add these environment variables:

   **Variable 1:**
   ```
   Key: VITE_SUPABASE_URL
   Value: https://aiewsoqlfaobrcqtdezd.supabase.co
   ```

   **Variable 2:**
   ```
   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZXdzb3FsZmFvYnJjcXRkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTQ5ODksImV4cCI6MjA4NjczMDk4OX0.unuoPvkdu-GvtC4ydFgTa8eMd0-jPlhl5l_D8muzF_E
   ```

6. Click **"Deploy site"**

## Step 3: Configure Supabase (1 minute)

1. Go to https://supabase.com/dashboard/project/aiewsoqlfaobrcqtdezd
2. Navigate to **Authentication** → **URL Configuration**
3. Update **Site URL** to your Netlify URL (e.g., `https://your-site.netlify.app`)
4. Add to **Redirect URLs**: `https://your-site.netlify.app/**`

## Step 4: Test Your Site

1. Visit your Netlify URL
2. Navigate to `/login`
3. Create first admin account (Sign Up)
4. Access admin dashboard at `/admin`
5. Test contact form submission

## Done! 🎉

Your site is now live with:
- ✅ Automatic HTTPS
- ✅ Real-time admin dashboard
- ✅ Contact form with database
- ✅ Continuous deployment

## Next Steps

- Customize content in admin dashboard
- Add custom domain (optional)
- Set up Google Analytics (optional)
- Share your website!

## Need Help?

- Full guide: See `DEPLOYMENT_GUIDE.md`
- Checklist: See `DEPLOYMENT_CHECKLIST.md`
- Admin docs: See `ADMIN_DOCUMENTATION.md`

## Your Credentials

**Supabase Project:**
- URL: https://aiewsoqlfaobrcqtdezd.supabase.co
- Dashboard: https://supabase.com/dashboard/project/aiewsoqlfaobrcqtdezd

**Netlify:**
- Dashboard: https://app.netlify.com

**Contact:**
- Email: enterprisessethsawaliya@gmail.com
- Phone: +91-7014235836
