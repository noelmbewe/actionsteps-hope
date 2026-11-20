ActionSteps Counseling - manual deployment
========================================

TARGETS
  frontend : actionstepscounseling.org      (document root of the main domain)
  api      : api.actionstepscounseling.org  (document root of the api subdomain)

1) DATABASE (once, phpMyAdmin -> actionst_actionsteps)
   - Import "schema.sql" (bundled in api.zip).
     Creates the "articles" and "admin_users" tables and seeds
     admin / Admin@123  (change this password after first login).
   - The newer "external_url" column and category values are added
     automatically on first request via ensure_schema() - no extra import.

2) FRONTEND  (actionstepscounseling.org)
   - Extract dist.zip into the domain's public_html (index.html, assets/, .htaccess, robots.txt).
   - Replace/overwrite existing files - the hashed asset names change every build.
   - The build already talks to https://api.actionstepscounseling.org

3) API  (api.actionstepscounseling.org)
   - Extract api.zip into the api subdomain's document root
     (index.php, admin.php, helpers.php, config.example.php, schema.sql, tools/, .htaccess).
   - ALSO upload api/config.php from your local project folder (the api/ folder next
     to this file). It contains the live database credentials:
       DB: actionst_actionsteps   user: actionst_laura
     config.php is not bundled in the zip on purpose - keep it private.
   - The .htaccess inside the zip will block web access to config.php, schema.sql,
     tools/, and dotfiles once uploaded.
   - The /uploads folder is created automatically on the first image upload.

4) VERIFY
   - https://actionstepscounseling.org  renders the site.
   - https://api.actionstepscounseling.org/index.php/articles  returns JSON.
   - http://api.actionstepscounseling.org/index.php/articles  (or https) works from both.
   - Log in at /admin, create a test article, upload a cover image, confirm the
     image URL comes back as https://api.actionstepscounseling.org/uploads/....

5) NOTES
   - The rich-text editor bundle loads on demand; the first admin edit may
     download ~400 KB extra - expected.
   - Never commit config.php or these two zip files to git (api.zip/dist.zip are
     currently tracked - consider:  git rm --cached api.zip dist.zip  and add
     them to .gitignore).