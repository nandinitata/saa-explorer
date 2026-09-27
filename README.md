# SAA Explorer

An interactive results explorer for the **South Atlantic Anomaly** capstone — a CU Boulder
Data Science project with LASP analysing 23 years of NASA TIMED-SEE EGS dark-current data
(2002–2024).

🛰️ **Live site:** https://nandinitata.github.io/saa-explorer/
📊 **Analysis code & data:** https://github.com/nandinitata/LASP-Project

## What it shows

- **Westward drift** of the SAA centroid (reported honestly — directionally correct but not
  statistically significant at 5 epochs).
- **Solar-cycle intensity**: ~21% higher peak rate at solar minimum than maximum.
- **Timing-offset discovery**: ascending vs descending peak asymmetry proves `TIME` marks the
  *end* of each 15 s integration.
- **Beta-angle confound**: the orbital beta angle explains ~45% of the raw offset scatter;
  correcting for it recovers the expected 7.5 s offset (clean estimate 7.273 ± 0.691 s).
- A gallery of the pipeline-generated figures and a methods/uncertainty summary.

## Tech

- **Vite + React** single-page app
- **Recharts** for interactive charts
- Data embedded in `src/data.js` (extracted from the analysis pipeline CSVs)
- Figures in `public/figures/`

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. In the repo settings, set **Settings → Pages → Source →
GitHub Actions** once to enable it.

The Vite `base` is set to `/saa-explorer/` in `vite.config.js` to match the Pages path.
