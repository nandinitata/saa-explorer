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

// ---------------------------------------------------------------------------
// Final-report (report 4) datasets — full team paper coverage
// ---------------------------------------------------------------------------

// 2.4 / 3.1  Drift rate: the paper's authoritative result is HARMONIC regression
// (sine/cosine + 11-yr period + drift term) on the 5-day barycenter series,
// NOT the preliminary linear fit.
export const driftHarmonic = {
  westDegPerYear: 0.28,      // westward (longitudinal)
  westR2: 0.7421,
  northDegPerYear: 0.024,    // northward (latitudinal)
  northR2: 0.6835,
  linearR2: 0.12,            // preliminary simple-linear fit (inadequate)
  mannKendallTau: -0.0643,   // velocity trend: significant but very weak
  velocityNote: 'near-constant drift velocity across the mission',
  literatureWest: '0.28-0.43',
  literatureNorth: '0.05-0.25',
  altitudeKm: 600,
}

// 3.2  Sunspot-number vs 95th-percentile intensity: lagged Pearson correlation.
// Verified from intensity_sunspots_monthly.csv (2004-2025); matches report Table 3.
export const lagCorr = [{"lag":0,"r":-0.4854},{"lag":1,"r":-0.5054},{"lag":2,"r":-0.557},{"lag":3,"r":-0.5857},{"lag":4,"r":-0.605},{"lag":5,"r":-0.6},{"lag":6,"r":-0.6334},{"lag":7,"r":-0.6573},{"lag":8,"r":-0.6738},{"lag":9,"r":-0.6726},{"lag":10,"r":-0.686},{"lag":11,"r":-0.6959},{"lag":12,"r":-0.6968},{"lag":13,"r":-0.6925},{"lag":14,"r":-0.7063},{"lag":15,"r":-0.7137},{"lag":16,"r":-0.7135},{"lag":17,"r":-0.6961},{"lag":18,"r":-0.707},{"lag":19,"r":-0.7075},{"lag":20,"r":-0.6995},{"lag":21,"r":-0.6855},{"lag":22,"r":-0.6925},{"lag":23,"r":-0.6925},{"lag":24,"r":-0.6779}]

// Report Table 3 — five strongest lags with p-values
export const lagTable = [
  { lag: 0,  r: -0.4850, p: '5.2e-17' },
  { lag: 15, r: -0.7137, p: '4.6e-40' },
  { lag: 16, r: -0.7135, p: '7.0e-40' },
  { lag: 19, r: -0.7075, p: '1.7e-38' },
  { lag: 18, r: -0.7070, p: '1.4e-38' },
  { lag: 14, r: -0.7063, p: '4.5e-39' },
]

export const intensityStats = {
  peakLag: 15,
  peakR: -0.7137,
  unlaggedR: -0.485,
  olsR2: 0.35,          // sunspot explains ~35% of intensity variance
  ccfMinLag: 8,         // intensity bottoms ~8 months after a solar maximum
  stlNote: 'STL remainder is not white noise — an unexplained cyclic factor persists',
  declineNote: 'mean rate per longitudinal cross-section fell ~550 to ~300 cts/s (2008-2025)',
  x28Flare: 2003,       // X28 flare event visible as an outlier
}

// Monthly 95th-percentile EGS intensity + sunspot number (2002-2025)
export const intensityMonthly = [{"t":2002.0,"p95":1261,"ss":184.6},{"t":2002.083,"p95":1345,"ss":170.2},{"t":2002.167,"p95":1180,"ss":147.1},{"t":2002.25,"p95":1192,"ss":186.9},{"t":2002.333,"p95":1118,"ss":187.5},{"t":2002.417,"p95":1357,"ss":128.8},{"t":2002.5,"p95":1213,"ss":161.0},{"t":2002.583,"p95":1207,"ss":175.6},{"t":2002.667,"p95":1132,"ss":187.9},{"t":2002.75,"p95":1256,"ss":151.2},{"t":2002.833,"p95":1217,"ss":147.2},{"t":2002.917,"p95":1086,"ss":135.3},{"t":2003.0,"p95":1182,"ss":133.5},{"t":2003.083,"p95":1312,"ss":75.7},{"t":2003.167,"p95":1182,"ss":100.7},{"t":2003.25,"p95":1225,"ss":97.9},{"t":2003.333,"p95":1211,"ss":86.8},{"t":2003.417,"p95":1551,"ss":118.7},{"t":2003.5,"p95":1412,"ss":128.3},{"t":2003.583,"p95":1504,"ss":115.4},{"t":2003.667,"p95":1433,"ss":78.5},{"t":2003.75,"p95":1477,"ss":97.8},{"t":2003.833,"p95":1753,"ss":82.9},{"t":2003.917,"p95":1875,"ss":72.2},{"t":2004.0,"p95":2083,"ss":60.6},{"t":2004.083,"p95":2047,"ss":74.6},{"t":2004.167,"p95":1826,"ss":74.8},{"t":2004.25,"p95":1647,"ss":59.2},{"t":2004.333,"p95":1556,"ss":72.8},{"t":2004.417,"p95":1755,"ss":66.5},{"t":2004.5,"p95":1590,"ss":83.8},{"t":2004.583,"p95":1640,"ss":69.7},{"t":2004.667,"p95":1439,"ss":48.8},{"t":2004.75,"p95":1541,"ss":74.2},{"t":2004.833,"p95":1574,"ss":70.1},{"t":2004.917,"p95":1469,"ss":28.9},{"t":2005.0,"p95":1726,"ss":48.1},{"t":2005.083,"p95":1711,"ss":43.5},{"t":2005.167,"p95":1556,"ss":39.6},{"t":2005.25,"p95":1514,"ss":38.7},{"t":2005.333,"p95":1479,"ss":61.9},{"t":2005.417,"p95":1747,"ss":56.8},{"t":2005.5,"p95":1580,"ss":62.4},{"t":2005.583,"p95":1629,"ss":60.5},{"t":2005.667,"p95":1637,"ss":37.2},{"t":2005.75,"p95":1695,"ss":13.2},{"t":2005.833,"p95":1583,"ss":27.5},{"t":2005.917,"p95":1453,"ss":59.3},{"t":2006.0,"p95":1546,"ss":20.9},{"t":2006.083,"p95":1647,"ss":5.7},{"t":2006.167,"p95":1483,"ss":17.3},{"t":2006.25,"p95":1473,"ss":50.3},{"t":2006.333,"p95":1436,"ss":37.2},{"t":2006.417,"p95":1639,"ss":24.5},{"t":2006.5,"p95":1429,"ss":22.2},{"t":2006.583,"p95":1458,"ss":20.8},{"t":2006.667,"p95":1445,"ss":23.7},{"t":2006.75,"p95":1628,"ss":14.9},{"t":2006.833,"p95":1545,"ss":35.7},{"t":2006.917,"p95":1373,"ss":22.3},{"t":2007.0,"p95":1514,"ss":29.3},{"t":2007.083,"p95":1644,"ss":18.4},{"t":2007.167,"p95":1466,"ss":7.2},{"t":2007.25,"p95":1510,"ss":5.4},{"t":2007.333,"p95":1442,"ss":19.5},{"t":2007.417,"p95":1695,"ss":21.3},{"t":2007.5,"p95":1492,"ss":15.1},{"t":2007.583,"p95":1528,"ss":9.8},{"t":2007.667,"p95":1506,"ss":4.0},{"t":2007.75,"p95":1696,"ss":1.5},{"t":2007.833,"p95":1581,"ss":2.8},{"t":2007.917,"p95":1451,"ss":17.3},{"t":2008.0,"p95":1622,"ss":4.1},{"t":2008.083,"p95":1703,"ss":2.9},{"t":2008.167,"p95":1533,"ss":15.5},{"t":2008.25,"p95":1567,"ss":3.6},{"t":2008.333,"p95":1517,"ss":4.6},{"t":2008.417,"p95":1746,"ss":5.2},{"t":2008.5,"p95":1556,"ss":0.6},{"t":2008.583,"p95":1612,"ss":0.3},{"t":2008.667,"p95":1601,"ss":1.2},{"t":2008.75,"p95":1768,"ss":4.2},{"t":2008.833,"p95":1625,"ss":6.6},{"t":2008.917,"p95":1524,"ss":1.0},{"t":2009.0,"p95":1707,"ss":1.3},{"t":2009.083,"p95":1793,"ss":1.2},{"t":2009.167,"p95":1621,"ss":0.6},{"t":2009.25,"p95":1678,"ss":1.2},{"t":2009.333,"p95":1628,"ss":2.9},{"t":2009.417,"p95":1819,"ss":6.3},{"t":2009.5,"p95":1601,"ss":5.5},{"t":2009.583,"p95":1635,"ss":0.0},{"t":2009.667,"p95":1652,"ss":7.1},{"t":2009.75,"p95":1831,"ss":7.7},{"t":2009.833,"p95":1713,"ss":6.9},{"t":2009.917,"p95":1597,"ss":16.3},{"t":2010.0,"p95":1770,"ss":19.5},{"t":2010.083,"p95":1839,"ss":28.5},{"t":2010.167,"p95":1671,"ss":24.0},{"t":2010.25,"p95":1702,"ss":10.4},{"t":2010.333,"p95":1660,"ss":13.9},{"t":2010.417,"p95":1877,"ss":18.8},{"t":2010.5,"p95":1644,"ss":25.2},{"t":2010.583,"p95":1684,"ss":29.6},{"t":2010.667,"p95":1701,"ss":36.4},{"t":2010.75,"p95":1869,"ss":33.6},{"t":2010.833,"p95":1741,"ss":34.4},{"t":2010.917,"p95":1603,"ss":24.5},{"t":2011.0,"p95":1798,"ss":27.3},{"t":2011.083,"p95":1866,"ss":48.3},{"t":2011.167,"p95":1665,"ss":78.6},{"t":2011.25,"p95":1700,"ss":76.1},{"t":2011.333,"p95":1666,"ss":58.2},{"t":2011.417,"p95":1854,"ss":56.1},{"t":2011.5,"p95":1639,"ss":64.5},{"t":2011.583,"p95":1726,"ss":65.8},{"t":2011.667,"p95":1702,"ss":120.1},{"t":2011.75,"p95":1849,"ss":125.7},{"t":2011.833,"p95":1659,"ss":139.1},{"t":2011.917,"p95":1538,"ss":109.3},{"t":2012.0,"p95":1702,"ss":94.4},{"t":2012.083,"p95":1769,"ss":47.8},{"t":2012.167,"p95":1529,"ss":86.6},{"t":2012.25,"p95":1588,"ss":85.9},{"t":2012.333,"p95":1577,"ss":96.5},{"t":2012.417,"p95":1739,"ss":92.0},{"t":2012.5,"p95":1538,"ss":100.1},{"t":2012.583,"p95":1592,"ss":94.8},{"t":2012.667,"p95":1608,"ss":93.7},{"t":2012.75,"p95":1697,"ss":76.5},{"t":2012.833,"p95":1537,"ss":87.6},{"t":2012.917,"p95":1477,"ss":56.8},{"t":2013.0,"p95":1678,"ss":96.1},{"t":2013.083,"p95":1706,"ss":60.9},{"t":2013.167,"p95":1507,"ss":78.3},{"t":2013.25,"p95":1560,"ss":107.3},{"t":2013.333,"p95":1529,"ss":120.2},{"t":2013.417,"p95":1670,"ss":76.7},{"t":2013.5,"p95":1463,"ss":86.2},{"t":2013.583,"p95":1526,"ss":91.8},{"t":2013.667,"p95":1561,"ss":54.5},{"t":2013.75,"p95":1653,"ss":114.4},{"t":2013.833,"p95":1487,"ss":113.9},{"t":2013.917,"p95":1391,"ss":124.2},{"t":2014.0,"p95":1615,"ss":117.0},{"t":2014.083,"p95":1579,"ss":146.1},{"t":2014.167,"p95":1414,"ss":128.7},{"t":2014.25,"p95":1444,"ss":112.5},{"t":2014.333,"p95":1442,"ss":112.5},{"t":2014.417,"p95":1571,"ss":102.9},{"t":2014.5,"p95":1387,"ss":100.2},{"t":2014.583,"p95":1439,"ss":106.9},{"t":2014.667,"p95":1461,"ss":130.0},{"t":2014.75,"p95":1516,"ss":90.0},{"t":2014.833,"p95":1357,"ss":103.6},{"t":2014.917,"p95":1275,"ss":112.9},{"t":2015.0,"p95":1467,"ss":93.0},{"t":2015.083,"p95":1466,"ss":66.7},{"t":2015.167,"p95":1303,"ss":54.5},{"t":2015.25,"p95":1289,"ss":75.3},{"t":2015.333,"p95":1354,"ss":88.8},{"t":2015.417,"p95":1443,"ss":66.5},{"t":2015.5,"p95":1340,"ss":65.8},{"t":2015.583,"p95":1370,"ss":64.4},{"t":2015.667,"p95":1460,"ss":78.6},{"t":2015.75,"p95":1487,"ss":63.6},{"t":2015.833,"p95":1339,"ss":62.2},{"t":2015.917,"p95":1281,"ss":58.0},{"t":2016.0,"p95":1504,"ss":57.0},{"t":2016.083,"p95":1493,"ss":56.4},{"t":2016.167,"p95":1335,"ss":54.1},{"t":2016.25,"p95":1339,"ss":37.9},{"t":2016.333,"p95":1417,"ss":51.5},{"t":2016.417,"p95":1515,"ss":20.5},{"t":2016.5,"p95":1334,"ss":32.4},{"t":2016.583,"p95":1356,"ss":50.2},{"t":2016.667,"p95":1476,"ss":44.6},{"t":2016.75,"p95":1491,"ss":33.4},{"t":2016.833,"p95":1350,"ss":21.4},{"t":2016.917,"p95":1337,"ss":18.5},{"t":2017.0,"p95":1562,"ss":26.1},{"t":2017.083,"p95":1531,"ss":26.4},{"t":2017.167,"p95":1387,"ss":17.7},{"t":2017.25,"p95":1354,"ss":32.3},{"t":2017.333,"p95":1486,"ss":18.9},{"t":2017.417,"p95":1531,"ss":19.2},{"t":2017.5,"p95":1397,"ss":17.8},{"t":2017.583,"p95":1411,"ss":32.6},{"t":2017.667,"p95":1548,"ss":43.7},{"t":2017.75,"p95":1579,"ss":13.2},{"t":2017.833,"p95":1402,"ss":5.7},{"t":2017.917,"p95":1398,"ss":8.2},{"t":2018.0,"p95":1627,"ss":6.8},{"t":2018.083,"p95":1586,"ss":10.7},{"t":2018.167,"p95":1441,"ss":2.5},{"t":2018.25,"p95":1394,"ss":8.9},{"t":2018.333,"p95":1575,"ss":13.1},{"t":2018.417,"p95":1562,"ss":15.6},{"t":2018.5,"p95":1459,"ss":1.6},{"t":2018.583,"p95":1424,"ss":8.7},{"t":2018.667,"p95":1580,"ss":3.3},{"t":2018.75,"p95":1616,"ss":4.9},{"t":2018.833,"p95":1440,"ss":4.9},{"t":2018.917,"p95":1431,"ss":3.1},{"t":2019.0,"p95":1597,"ss":7.7},{"t":2019.083,"p95":1611,"ss":0.8},{"t":2019.167,"p95":1479,"ss":9.4},{"t":2019.25,"p95":1443,"ss":9.1},{"t":2019.333,"p95":1636,"ss":9.9},{"t":2019.417,"p95":1597,"ss":1.2},{"t":2019.5,"p95":1501,"ss":0.9},{"t":2019.583,"p95":1459,"ss":0.5},{"t":2019.667,"p95":1606,"ss":1.1},{"t":2019.75,"p95":1635,"ss":0.4},{"t":2019.833,"p95":1489,"ss":0.5},{"t":2019.917,"p95":1501,"ss":1.5},{"t":2020.0,"p95":1664,"ss":6.2},{"t":2020.083,"p95":1640,"ss":0.2},{"t":2020.167,"p95":1533,"ss":1.5},{"t":2020.25,"p95":1485,"ss":5.2},{"t":2020.333,"p95":1717,"ss":0.2},{"t":2020.417,"p95":1623,"ss":5.8},{"t":2020.5,"p95":1543,"ss":6.1},{"t":2020.583,"p95":1513,"ss":7.5},{"t":2020.667,"p95":1677,"ss":0.6},{"t":2020.75,"p95":1696,"ss":14.6},{"t":2020.833,"p95":1525,"ss":34.5},{"t":2020.917,"p95":1514,"ss":23.1},{"t":2021.0,"p95":1651,"ss":10.4},{"t":2021.083,"p95":1658,"ss":8.2},{"t":2021.167,"p95":1540,"ss":17.2},{"t":2021.25,"p95":1504,"ss":24.5},{"t":2021.333,"p95":1752,"ss":21.2},{"t":2021.417,"p95":1620,"ss":25.0},{"t":2021.5,"p95":1594,"ss":34.3},{"t":2021.583,"p95":1567,"ss":22.0},{"t":2021.667,"p95":1723,"ss":51.3},{"t":2021.75,"p95":1676,"ss":37.4},{"t":2021.833,"p95":1524,"ss":34.8},{"t":2021.917,"p95":1542,"ss":67.5},{"t":2022.0,"p95":1650,"ss":55.3},{"t":2022.083,"p95":1634,"ss":60.9},{"t":2022.167,"p95":1524,"ss":78.6},{"t":2022.25,"p95":1475,"ss":84.0},{"t":2022.333,"p95":1676,"ss":96.5},{"t":2022.417,"p95":1554,"ss":70.3},{"t":2022.5,"p95":1532,"ss":91.4},{"t":2022.583,"p95":1520,"ss":74.6},{"t":2022.667,"p95":1652,"ss":96.0},{"t":2022.75,"p95":1562,"ss":95.5},{"t":2022.833,"p95":1441,"ss":80.5},{"t":2022.917,"p95":1487,"ss":112.8},{"t":2023.0,"p95":1534,"ss":144.4},{"t":2023.083,"p95":1472,"ss":111.3},{"t":2023.167,"p95":1382,"ss":123.3},{"t":2023.25,"p95":1307,"ss":97.6},{"t":2023.333,"p95":1489,"ss":137.4},{"t":2023.417,"p95":1361,"ss":160.5},{"t":2023.5,"p95":1351,"ss":160.0},{"t":2023.583,"p95":1334,"ss":114.8},{"t":2023.667,"p95":1406,"ss":134.2},{"t":2023.75,"p95":1337,"ss":99.9},{"t":2023.833,"p95":1212,"ss":107.1},{"t":2023.917,"p95":1279,"ss":113.5},{"t":2024.0,"p95":1349,"ss":126.0},{"t":2024.083,"p95":1278,"ss":123.0},{"t":2024.167,"p95":1211,"ss":103.7},{"t":2024.25,"p95":1178,"ss":137.0},{"t":2024.333,"p95":1293,"ss":172.1},{"t":2024.417,"p95":1189,"ss":164.1},{"t":2024.5,"p95":1222,"ss":196.8},{"t":2024.583,"p95":1159,"ss":216.0},{"t":2024.667,"p95":1223,"ss":141.1},{"t":2024.75,"p95":1062,"ss":165.8},{"t":2024.833,"p95":1002,"ss":154.1},{"t":2024.917,"p95":1088,"ss":154.6},{"t":2025.0,"p95":1087,"ss":137.0},{"t":2025.083,"p95":998,"ss":155.7},{"t":2025.167,"p95":966,"ss":134.2},{"t":2025.25,"p95":979,"ss":141.4},{"t":2025.333,"p95":1088,"ss":78.5},{"t":2025.417,"p95":995,"ss":114.6},{"t":2025.5,"p95":1080,"ss":125.9},{"t":2025.583,"p95":1068,"ss":133.7},{"t":2025.667,"p95":1090,"ss":129.7},{"t":2025.75,"p95":960,"ss":114.6},{"t":2025.833,"p95":911,"ss":91.8},{"t":2025.917,"p95":1058,"ss":124.0}]

// 2.7 / 3.4  Shape & splitting
export const shapeSplitting = {
  method: 'spherical-harmonic contour fitting + k-means (k=2) clustering',
  secondaryLon: -36,          // secondary barycenter longitude
  secondaryStableYear: 2018,  // stabilizes after this
  shape: 'pear-shaped, tail reaching toward Africa',
  shrinkYears: '2024-2025',
  heAreaReductionPct: 6.09,   // He et al. (2025), area reduction at solar max
  verdict: 'tentative, not conclusive — contours stayed pear-shaped, not clearly bimodal',
}

// Authors of the final report
export const authors = [
  'Keegan Chatham', 'Noa Dabbagh', 'Sai Nandini Tata', 'Julian Goodfellow',
]
