# GitHub Pages preview

The static preview is built from the `deploy/github-pages-preview` branch and published at:

`https://raphicsdigitalsolutions.github.io/rebuildraphicsdigitalsolutionswebsite/`

## One-time repository setting

Before the first deployment, open:

**Repository → Settings → Pages → Build and deployment → Source → GitHub Actions**

Save that setting. The preview workflow now checks the configured Pages site and publishes the static build. If the Pages source is set to GitHub Actions, the deployment job should complete.

After enabling Pages, open **Actions → Deploy GitHub Pages Preview** and choose **Run workflow** on `deploy/github-pages-preview`, or push another commit to that branch.

## Preview limitations

- This is a static preview for checking design, layout, navigation, portfolio sections and 3D effects.
- The contact inquiry form is intentionally replaced with an email CTA because GitHub Pages does not run the Express `/api/contact` backend.
- No inquiry is stored by the preview.
- The production backend, database, email notifications and final domain will be configured later for the Vercel launch.

The workflow also deploys `main` after the preview setup, so future merged changes update the Pages preview automatically.


Redeploy trigger: 2026-11-03. The preview branch was updated to request a fresh Pages deployment after the repository Pages setting was configured.
