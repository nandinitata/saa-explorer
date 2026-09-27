// All datasets are extracted from the analysis pipeline CSVs in the
// nandinitata/LASP-Project repo (output/*.csv). Longitudes are converted from
// the 0-360 convention to west-negative degrees for readability.

// Yearly SAA metrics (output/saa_metrics.csv). solarPhase from the solar cycle:
// 2002 ~SC23 max, 2009 deep min, 2014 SC24 max, 2019 min, 2024 SC25 max.
export const yearlyMetrics = [
  { year: 2002, lat: -27.50, lon: -45.37, peak: 1511, integrated: 2297728, solarPhase: 'max' },
  { year: 2009, lat: -25.90, lon: -48.39, peak: 1928, integrated: 3643007, solarPhase: 'min' },
  { year: 2014, lat: -26.33, lon: -49.57, peak: 1736, integrated: 2732004, solarPhase: 'max' },
  { year: 2019, lat: -26.14, lon: -50.47, peak: 1909, integrated: 3539057, solarPhase: 'min' },
  { year: 2024, lat: -27.75, lon: -48.87, peak: 1501, integrated: 2581176, solarPhase: 'max' },
]

// Linear drift fit reported in output/uncertainity_report.txt
export const driftFit = {
  slope: -0.1763,        // deg/year (west-negative)
  ciLow: -0.4357,
  ciHigh: 0.0830,
  stdErr: 0.0815,
  r2: 0.6094,
  pValue: 0.1192,
  significant: false,
}

// Future longitude predictions (output/position_predictions.csv)
export const positionPredictions = [
  { year: 2025, lon: -50.54, lonLo: -56.24, lonHi: -44.85 },
  { year: 2030, lon: -51.43, lonLo: -57.89, lonHi: -44.96 },
  { year: 2035, lon: -52.31, lonLo: -59.69, lonHi: -44.93 },
  { year: 2040, lon: -53.19, lonLo: -61.59, lonHi: -44.79 },
  { year: 2050, lon: -54.95, lonLo: -65.57, lonHi: -44.33 },
]

// Timing offset vs orbital beta angle (output/beta_augmented_offsets.csv).
// offset in seconds, beta in degrees. trustworthy = quality-filtered window.
export const offsetVsBeta = [
  { label: '2005 d060', beta: -31.5, offset: 7.67, err: 1.91, trustworthy: true,  yaw: false },
  { label: '2005 d150', beta: -35.8, offset: 5.36, err: 1.83, trustworthy: true,  yaw: false },
  { label: '2005 d240', beta:  41.5, offset: 19.67, err: 1.72, trustworthy: true, yaw: false },
  { label: '2005 d330', beta:  29.8, offset: 8.08, err: 2.09, trustworthy: false, yaw: false },
  { label: '2010 d060', beta: -21.8, offset: 8.09, err: 1.71, trustworthy: true,  yaw: false },
  { label: '2010 d150', beta: -41.9, offset: 2.02, err: 1.85, trustworthy: true,  yaw: false },
  { label: '2010 d240', beta:  31.5, offset: 22.33, err: 1.68, trustworthy: true, yaw: false },
  { label: '2010 d330', beta:  37.2, offset: 12.22, err: 1.92, trustworthy: true, yaw: false },
  { label: '2015 d060', beta:  -4.8, offset: 12.83, err: 1.88, trustworthy: true, yaw: true  },
  { label: '2015 d150', beta: -48.9, offset: 6.26, err: 1.87, trustworthy: true,  yaw: false },
  { label: '2015 d240', beta:  12.7, offset: 20.23, err: 1.95, trustworthy: true, yaw: true  },
  { label: '2015 d330', beta:  47.5, offset: 16.30, err: 1.79, trustworthy: false, yaw: false },
  { label: '2020 d060', beta:  26.5, offset: 38.74, err: 1.88, trustworthy: false, yaw: false },
  { label: '2020 d150', beta: -43.7, offset: 10.91, err: 1.89, trustworthy: true, yaw: false },
  { label: '2020 d240', beta: -19.1, offset: 10.43, err: 1.77, trustworthy: true, yaw: false },
  { label: '2020 d330', beta:  47.0, offset: 27.56, err: 1.99, trustworthy: true, yaw: false },
]

// Beta-angle correlation stats (output/beta_analysis_report.txt / beta_inference_report.txt)
export const betaFit = {
  slope: 0.1776,       // offset = slope*beta + intercept
  intercept: 14.003,
  r2: 0.4528,
  pValue: 0.0043,
  chi2Before: 40.2,
  chi2After: 13.5,
  chi2Reduction: 66.3,
  cleanOffset: 7.273,
  cleanOffsetErr: 0.691,
  expectedOffset: 7.5,
  deviationSigma: 0.3,
}

export const headline = {
  years: 23,
  files: 8366,
  windows: 16,
  driftRate: -0.176,
  solarMinPeak: 1919,
  solarMaxPeak: 1583,
  solarPct: 21,
}

// Curated result figures (files live in /public/figures)
export const gallery = [
  { src: 'figures/saa-evolution.png', title: 'SAA evolution across epochs', caption: 'Yearly SAA maps (2002-2024) showing the anomaly footprint and centroid.' },
  { src: 'figures/drift-analysis.png', title: 'Drift analysis', caption: 'Centroid longitude, latitude, peak rate and integrated rate vs year with linear fits.' },
  { src: 'figures/timing-evidence.png', title: 'Timing-offset evidence', caption: 'Ascending peaks sit north of descending peaks in every window — the signature of TIME = end of integration.' },
  { src: 'figures/beta-offset-correlation.png', title: 'Offset vs beta angle', caption: 'Signed beta angle explains ~45% of the raw timing-offset scatter (R2 = 0.45, p = 0.004).' },
  { src: 'figures/beta-asymmetry.png', title: 'Signed beta asymmetry', caption: 'Negative-beta windows cluster near 7.5 s; positive-beta windows are ~3x higher.' },
  { src: 'figures/correction-effect.png', title: 'Before / after beta correction', caption: 'Correcting for beta collapses chi-squared by 66% and centres the offset on 7.5 s.' },
  { src: 'figures/thermal-null.png', title: 'Thermal null test', caption: 'Dark current outside the SAA shows no beta dependence — the effect is geometric, not thermal.' },
  { src: 'figures/gridded-saa.png', title: 'Gridded SAA map', caption: 'Measurement-split spatial gridding of the SAA core.' },
  { src: 'figures/overlay-map-2024.png', title: 'SAA overlay, 2024', caption: 'Single-epoch ground-track overlay of elevated count rates over the South Atlantic.' },
  { src: 'figures/intensity-timeseries.png', title: 'Intensity time series', caption: 'Peak count rate tracks the solar cycle — higher at solar minimum.' },
  { src: 'figures/uncertainty-analysis.png', title: 'Uncertainty quantification', caption: 'Counting-statistics (Poisson/Gaussian) error propagation on all derived metrics.' },
  { src: 'figures/sampling-adequacy.png', title: 'Sampling adequacy', caption: 'Per-bin measurement counts bound the achievable spatial resolution of the maps.' },
  { src: 'figures/smoking-gun-2020.png', title: 'The 2020 window', caption: 'A low-coverage, high-beta window illustrating why quality filtering matters.' },
]
