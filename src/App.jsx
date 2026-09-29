import { useEffect, useRef, useState } from 'react'
import {
  ResponsiveContainer, ComposedChart, Line, Area, BarChart, Bar, Cell,
  ScatterChart, Scatter, ErrorBar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine,
} from 'recharts'
import {
  yearlyMetrics, driftFit, offsetVsBeta, betaFit, headline, gallery,
  driftHarmonic, lagCorr, lagTable, intensityStats, intensityMonthly,
  shapeSplitting, authors,
} from './data.js'

const REPO = 'https://github.com/nandinitata/saa-explorer'

/* ---- scroll reveal ---- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="brand"><span className="dot" />SAA&nbsp;EXPLORER</div>
      <div className="links">
        <a href="#findings">Findings</a>
        <a href="#drift">Drift</a>
        <a href="#intensity">Intensity</a>
        <a href="#timing">Timing</a>
        <a href="#shape">Shape</a>
        <a href="#methods">Methods</a>
      </div>
      <a className="ghlink" href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero wrap">
      <div className="kicker reveal">LASP · CU Boulder Data Science Capstone · 2002–2025</div>
      <h1 className="reveal">
        The <span className="heat-text">Drifting</span><br />Anomaly
      </h1>
      <p className="sub reveal">
        The South Atlantic Anomaly is where Earth's inner radiation belt dips closest to the
        surface. Across {headline.years} years of TIMED-SEE dark-current data, this study charts its
        westward drift, its anti-correlation with the solar cycle, an emerging second lobe, and a
        satellite timing-calibration question hidden in the numbers.
      </p>
      <div className="chips reveal">
        <div className="chip"><b>~8,366</b> daily NetCDF files</div>
        <div className="chip"><b>EGS</b> dark current · 15&nbsp;s integration</div>
        <div className="chip"><b>Harmonic</b> regression &amp; STL decomposition</div>
        <div className="chip"><b>Poisson</b> counting-statistics uncertainty</div>
      </div>
      <div className="scrollcue reveal"><span className="bar" />Scroll to explore</div>
    </header>
  )
}

function StatStrip() {
  const stats = [
    { num: <><span className="heat-text">0.28</span>°/yr</>, lab: 'Westward drift · harmonic R²=0.74' },
    { num: <><span className="cyan-text">−0.71</span></>, lab: 'Intensity–solar correlation (15-mo lag)' },
    { num: <>7.27<small style={{ fontSize: '.5em' }}> s</small></>, lab: 'Timing offset · end of integration' },
    { num: <><span className="cyan-text">−36°</span></>, lab: 'Emerging 2nd barycenter (post-2018)' },
  ]
  return (
    <div className="wrap reveal">
      <div className="statstrip">
        {stats.map((s, i) => (
          <div className="cell" key={i}>
            <div className="num" style={{ fontFamily: 'var(--font-display)' }}>{s.num}</div>
            <div className="lab">{s.lab}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const findings = [
  {
    cls: 'c-heat', tag: 'Drift', idx: '01', title: 'Westward drift, confirmed',
    body: 'A harmonic regression (sine/cosine + 11-yr period + drift term) on the 5-day barycenter series gives a westward drift of 0.28°/yr and a northward drift of 0.024°/yr — consistent with prior reports. A simple linear model was inadequate (R²≈0.12), so the periodic solar signal had to be modeled explicitly.',
    metric: <>0.28 <small>°/yr W · R²=0.74 · 0.024°/yr N</small></>,
  },
  {
    cls: 'c-cyan', tag: 'Intensity', idx: '02', title: 'The anomaly breathes with the Sun',
    body: 'Particle-flux intensity is strongly anti-correlated with solar activity: the Pearson correlation between sunspot number and 95th-percentile EGS rate peaks at −0.714 with a 15-month lag. A residual decline remains after removing the solar signal — larger than solar modulation alone explains.',
    metric: <>−0.714 <small>· 15-month lag · p≈5e-40</small></>,
  },
  {
    cls: 'c-violet', tag: 'Calibration', idx: '03', title: 'TIME marks the end of integration',
    body: 'Comparing ascending vs descending SAA peak latitudes across 16 windows, ascending peaks sit consistently north of descending — proof that TIME labels the end of each 15 s exposure. A signed beta-angle confound explains the scatter; clean windows give the true offset.',
    metric: <>7.273 ± 0.691 s <small>· 0.3σ from 7.5 s</small></>,
  },
  {
    cls: 'c-heat', tag: 'Shape', idx: '04', title: 'A tentative second lobe',
    body: 'Spherical-harmonic contours keep the SAA pear-shaped, with a tail toward Africa and a slight 2024–2025 shrinkage. k-means (k=2) finds a secondary barycenter that stabilizes near −36° longitude after 2018 — suggestive of incipient splitting, but not yet conclusive.',
    metric: <>−36° <small>· secondary node · stable post-2018</small></>,
  },
]

function Findings() {
  return (
    <section id="findings">
      <div className="wrap">
        <div className="eyebrow reveal">Key findings</div>
        <h2 className="section-title reveal">Four questions, one dataset</h2>
        <p className="lede reveal">
          Position, intensity, timing calibration, and shape — each investigated with its own
          pipeline and every derived quantity backed by Poisson counting-statistics uncertainty.
        </p>
        <div className="findings">
          {findings.map((f) => (
            <div className={`card ${f.cls} reveal`} key={f.idx}>
              <div className="glow" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="idx">{f.idx}</span>
                <span className="tag">{f.tag}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <div className="metric heat-text" style={f.cls === 'c-cyan' ? { color: 'var(--cyan)', background: 'none', WebkitBackgroundClip: 'initial' } : undefined}>{f.metric}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- custom tooltips ---- */
function DriftTip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="tooltip">
      <div className="t-title">{d.year}</div>
      <div className="t-row">centroid lon: {d.lon.toFixed(2)}°</div>
      <div className="t-row">lat: {d.lat.toFixed(2)}° · peak: {d.peak} cts/s</div>
    </div>
  )
}
function IntensityTip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="tooltip">
      <div className="t-title">{d.year} · solar {d.solarPhase}</div>
      <div className="t-row">peak rate: {d.peak} cts/s</div>
    </div>
  )
}
function BetaTip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="tooltip">
      <div className="t-title">{d.label}</div>
      <div className="t-row">β = {d.beta}° · offset = {d.offset.toFixed(1)} ± {d.err} s</div>
      <div className="t-row">{d.trustworthy ? 'quality-filtered' : 'flagged (low quality)'}{d.yaw ? ' · yaw maneuver' : ''}</div>
    </div>
  )
}

function TsTip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const yr = Math.floor(d.t)
  const mo = Math.round((d.t - yr) * 12) + 1
  return (
    <div className="tooltip">
      <div className="t-title">{yr}-{String(mo).padStart(2, '0')}</div>
      <div className="t-row">p95 intensity: {d.p95} cts/s</div>
      <div className="t-row">sunspot №: {d.ss}</div>
    </div>
  )
}
function LagTip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="tooltip">
      <div className="t-title">lag {d.lag} months</div>
      <div className="t-row">Pearson r = {d.r.toFixed(3)}</div>
    </div>
  )
}

const AXIS = { stroke: '#5d6a8a', fontSize: 11, fontFamily: 'IBM Plex Mono' }
const GRID = 'rgba(140,165,220,0.10)'

// linear-fit series for the drift chart
const meanYear = yearlyMetrics.reduce((s, d) => s + d.year, 0) / yearlyMetrics.length
const meanLon = yearlyMetrics.reduce((s, d) => s + d.lon, 0) / yearlyMetrics.length
const fitIntercept = meanLon - driftFit.slope * meanYear
const driftData = yearlyMetrics.map((d) => ({ ...d, fit: driftFit.slope * d.year + fitIntercept }))
const betaSeg = [
  { x: -50, y: betaFit.slope * -50 + betaFit.intercept },
  { x: 50, y: betaFit.slope * 50 + betaFit.intercept },
]
const cleanPts = offsetVsBeta.filter((d) => d.trustworthy)
const flaggedPts = offsetVsBeta.filter((d) => !d.trustworthy)

// strongest (most negative) lag for highlighting
const peakLag = lagCorr.reduce((a, b) => (b.r < a.r ? b : a), lagCorr[0]).lag

function DriftSection() {
  return (
    <section id="drift">
      <div className="wrap">
        <div className="eyebrow reveal">Position &amp; drift</div>
        <h2 className="section-title reveal">Where it is, and where it's going</h2>
        <p className="lede reveal">
          Daily barycenters, sampled every fifth day for 23 years, trace a steady march west. Because the
          series carries a strong 11-year solar oscillation, a simple line fits poorly (R²≈0.12) — so a
          harmonic regression with sine, cosine, an 11-year period and a drift term is what pins the rate.
        </p>
        <div className="chart-grid">
          <div className="panel reveal">
            <div className="p-head">
              <h4>Centroid longitude, sample years</h4>
              <span className="p-note">°W vs year</span>
            </div>
            <p className="p-desc">Five representative years from the Poisson-uncertainty sample. More negative = further west.</p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={driftData} margin={{ top: 6, right: 12, bottom: 4, left: -8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="year" tick={AXIS} axisLine={{ stroke: GRID }} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} domain={[-54, -42]} tickFormatter={(v) => `${v}°`} />
                <Tooltip content={<DriftTip />} cursor={{ stroke: 'rgba(140,165,220,0.3)' }} />
                <Line type="monotone" dataKey="lon" stroke="#ff5a45" strokeWidth={2.5} dot={{ r: 5, fill: '#ff5a45', stroke: '#04060e', strokeWidth: 2 }} activeDot={{ r: 7 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="legend">
              <span><i style={{ background: '#ff5a45' }} />measured centroid (5-day barycenter mean)</span>
            </div>
          </div>

          <div className="panel reveal">
            <div className="p-head">
              <h4>Harmonic regression result</h4>
              <span className="p-note">full 2002–2025 series</span>
            </div>
            <p className="p-desc">The authoritative drift rates, from the harmonic model fit to the full barycenter series.</p>
            <div className="factgrid">
              <div className="fact"><div className="fv heat-text">0.28°/yr</div><div className="fl">westward drift · R²=0.74</div></div>
              <div className="fact"><div className="fv cyan-text">0.024°/yr</div><div className="fl">northward drift · R²=0.68</div></div>
              <div className="fact"><div className="fv">0.28–0.43</div><div className="fl">literature range (°/yr west)</div></div>
              <div className="fact"><div className="fv">τ = −0.064</div><div className="fl">Mann-Kendall: near-constant velocity</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntensitySection() {
  return (
    <section id="intensity">
      <div className="wrap">
        <div className="eyebrow reveal">Intensity &amp; the solar cycle</div>
        <h2 className="section-title reveal">The anomaly <span className="cyan-text">breathes</span> with the Sun</h2>
        <p className="lede reveal">
          Monthly 95th-percentile EGS rate rises and falls opposite the sunspot number. The relationship is
          delayed — the strongest anti-correlation appears 15 months after solar activity — and a residual
          decline persists beyond what the solar cycle alone explains.
        </p>
        <div className="chart-grid">
          <div className="panel full reveal">
            <div className="p-head">
              <h4>Monthly intensity vs sunspot number</h4>
              <span className="p-note">2002–2025 · p95 EGS rate &amp; sunspot №</span>
            </div>
            <p className="p-desc">Intensity (heat) troughs when the sunspot number (cyan) peaks — with a lag — and drifts downward across the mission.</p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={intensityMonthly} margin={{ top: 6, right: 6, bottom: 4, left: -6 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="t" type="number" domain={[2002, 2026]} ticks={[2004, 2008, 2012, 2016, 2020, 2024]} tick={AXIS} axisLine={{ stroke: GRID }} tickLine={false} />
                <YAxis yAxisId="l" tick={AXIS} axisLine={false} tickLine={false} domain={[800, 2200]} />
                <YAxis yAxisId="r" orientation="right" tick={AXIS} axisLine={false} tickLine={false} domain={[0, 220]} />
                <Tooltip content={<TsTip />} cursor={{ stroke: 'rgba(140,165,220,0.3)' }} />
                <Line yAxisId="r" type="monotone" dataKey="ss" stroke="#3ce0e8" strokeWidth={1.2} dot={false} strokeOpacity={0.7} />
                <Line yAxisId="l" type="monotone" dataKey="p95" stroke="#ff7a3c" strokeWidth={1.8} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="legend">
              <span><i style={{ background: '#ff7a3c' }} />p95 EGS intensity (left axis)</span>
              <span><i style={{ background: '#3ce0e8' }} />sunspot number (right axis)</span>
            </div>
          </div>
        </div>

        <div className="chart-grid">
          <div className="panel reveal">
            <div className="p-head">
              <h4>Lagged correlation</h4>
              <span className="p-note">Pearson r vs lag</span>
            </div>
            <p className="p-desc">Correlation deepens with lag, peaking at −0.714 at 15 months (lags 14–20 within ~0.02).</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={lagCorr} margin={{ top: 6, right: 12, bottom: 4, left: -8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="lag" tick={AXIS} axisLine={{ stroke: GRID }} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} domain={[-0.75, 0]} />
                <Tooltip content={<LagTip />} cursor={{ fill: 'rgba(140,165,220,0.06)' }} />
                <Bar dataKey="r" radius={[0, 0, 4, 4]} maxBarSize={16}>
                  {lagCorr.map((d, i) => (
                    <Cell key={i} fill={d.lag === peakLag ? '#3ce0e8' : 'rgba(255,122,60,0.55)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="legend">
              <span><i style={{ background: '#3ce0e8' }} />strongest lag (15 mo)</span>
              <span><i style={{ background: 'rgba(255,122,60,0.55)' }} />other lags</span>
            </div>
          </div>

          <div className="panel reveal">
            <div className="p-head">
              <h4>Peak rate by sample year</h4>
              <span className="p-note">cts/s · solar phase</span>
            </div>
            <p className="p-desc">Solar-minimum years (2009, 2019) peak higher; 2024 is the lowest — part of the secular decline.</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={yearlyMetrics} margin={{ top: 6, right: 12, bottom: 4, left: -8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="year" tick={AXIS} axisLine={{ stroke: GRID }} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} domain={[1400, 2000]} />
                <Tooltip content={<IntensityTip />} cursor={{ fill: 'rgba(140,165,220,0.06)' }} />
                <Bar dataKey="peak" radius={[5, 5, 0, 0]} maxBarSize={48}>
                  {yearlyMetrics.map((d, i) => (
                    <Cell key={i} fill={d.solarPhase === 'min' ? '#3ce0e8' : '#ff7a3c'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="legend">
              <span><i style={{ background: '#3ce0e8' }} />solar minimum</span>
              <span><i style={{ background: '#ff7a3c' }} />solar maximum</span>
            </div>
          </div>
        </div>

        <div className="statstrip reveal" style={{ marginTop: 18 }}>
          <div className="cell"><div className="num cyan-text" style={{ fontFamily: 'var(--font-display)' }}>−0.714</div><div className="lab">peak Pearson r (15-mo lag)</div></div>
          <div className="cell"><div className="num" style={{ fontFamily: 'var(--font-display)' }}>35%</div><div className="lab">intensity variance from solar (OLS R²)</div></div>
          <div className="cell"><div className="num" style={{ fontFamily: 'var(--font-display)' }}>8 mo</div><div className="lab">intensity min after solar max (CCF)</div></div>
          <div className="cell"><div className="num heat-text" style={{ fontFamily: 'var(--font-display)' }}>↓ decline</div><div className="lab">STL trend, beyond solar modulation</div></div>
        </div>
      </div>
    </section>
  )
}

const shapeMethods = [
  { tag: 'Spherical-harmonic contours', body: 'EGS-rate contours are fit with a spherical-harmonic surface and drawn per year to trace the SAA outline. The anomaly stays pear-shaped, with a tail toward Africa and a slight shrinkage across contour levels in 2024–2025.' },
  { tag: 'k-means (k = 2) clustering', body: 'Forcing two intensity centers separates a primary and a secondary barycenter. The secondary node is erratic before 2018, then stabilizes near −36° longitude — hinting at an emerging second lobe, though not as far east as Swarm magnetic data suggests.' },
]

function ShapeSection() {
  return (
    <section id="shape">
      <div className="wrap">
        <div className="eyebrow reveal">Shape &amp; splitting</div>
        <h2 className="section-title reveal">Pear-shaped — and maybe <span className="heat-text">splitting</span></h2>
        <p className="lede reveal">
          Beyond position and intensity, the SAA's morphology is changing. Two methods probe whether the
          anomaly is developing a second lobe, as recent Swarm-satellite work suggests.
        </p>
        <div className="findings">
          {shapeMethods.map((m) => (
            <div className="card c-heat reveal" key={m.tag}>
              <div className="glow" />
              <span className="tag">{m.tag}</span>
              <p style={{ marginTop: 16 }}>{m.body}</p>
            </div>
          ))}
        </div>
        <div className="statstrip reveal" style={{ marginTop: 18 }}>
          <div className="cell"><div className="num heat-text" style={{ fontFamily: 'var(--font-display)' }}>−36°</div><div className="lab">secondary barycenter longitude</div></div>
          <div className="cell"><div className="num" style={{ fontFamily: 'var(--font-display)' }}>2018</div><div className="lab">second node stabilizes after</div></div>
          <div className="cell"><div className="num cyan-text" style={{ fontFamily: 'var(--font-display)' }}>6.09%</div><div className="lab">area reduction at solar max (He 2025)</div></div>
          <div className="cell"><div className="num" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem' }}>Tentative</div><div className="lab">splitting evidence, not conclusive</div></div>
        </div>
      </div>
    </section>
  )
}

function TimingSection() {
  return (
    <section id="timing">
      <div className="wrap">
        <div className="eyebrow reveal">The timing discovery</div>
        <h2 className="section-title reveal">A calibration answer hidden in <span className="cyan-text">geometry</span></h2>
        <p className="lede reveal">
          Does the reported <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>TIME</code> mark the
          start or the end of each 15&nbsp;s exposure? At 7.5&nbsp;km/s the answer shifts every position by up to
          a full degree. Comparing ascending and descending peaks answered it — but the windows scattered until
          the orbital <b>beta angle</b> explained why.
        </p>
        <div className="chart-grid">
          <div className="panel full reveal">
            <div className="p-head">
              <h4>Timing offset vs orbital beta angle</h4>
              <span className="p-note">R² = {betaFit.r2} · p = {betaFit.pValue}</span>
            </div>
            <p className="p-desc">
              Signed β explains ~45% of the raw offset scatter. Negative-β windows cluster near the expected
              7.5&nbsp;s; positive-β windows run nearly 3× higher. Clean windows give a true offset of
              7.273 ± 0.691&nbsp;s — 0.3σ from the expected INT_TIME/2.
            </p>
            <ResponsiveContainer width="100%" height={360}>
              <ScatterChart margin={{ top: 10, right: 18, bottom: 24, left: 2 }}>
                <CartesianGrid stroke={GRID} />
                <XAxis type="number" dataKey="beta" name="beta" domain={[-55, 55]} tick={AXIS} axisLine={{ stroke: GRID }} tickLine={false}
                  label={{ value: 'orbital beta angle  (°)', position: 'bottom', offset: 6, fill: '#5d6a8a', fontFamily: 'IBM Plex Mono', fontSize: 11 }} />
                <YAxis type="number" dataKey="offset" name="offset" domain={[0, 42]} tick={AXIS} axisLine={false} tickLine={false}
                  label={{ value: 'offset (s)', angle: -90, position: 'insideLeft', fill: '#5d6a8a', fontFamily: 'IBM Plex Mono', fontSize: 11 }} />
                <Tooltip content={<BetaTip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(140,165,220,0.3)' }} />
                <ReferenceLine y={7.5} stroke="#3ce0e8" strokeDasharray="5 4" label={{ value: 'expected 7.5 s', fill: '#3ce0e8', fontFamily: 'IBM Plex Mono', fontSize: 10, position: 'insideBottomLeft' }} />
                <ReferenceLine segment={betaSeg} stroke="#8a7bff" strokeWidth={1.5} strokeDasharray="6 4" ifOverflow="extendDomain" />
                <Scatter name="quality-filtered" data={cleanPts} fill="#ff7a3c">
                  <ErrorBar dataKey="err" width={4} strokeWidth={1} stroke="rgba(255,122,60,0.5)" direction="y" />
                </Scatter>
                <Scatter name="flagged" data={flaggedPts} fill="#5d6a8a" shape="triangle">
                  <ErrorBar dataKey="err" width={4} strokeWidth={1} stroke="rgba(93,106,138,0.5)" direction="y" />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="legend">
              <span><i style={{ background: '#ff7a3c' }} />quality-filtered windows</span>
              <span><i style={{ background: '#5d6a8a' }} />flagged (low coverage / yaw)</span>
              <span><i style={{ background: '#8a7bff' }} />β regression</span>
              <span><i style={{ background: '#3ce0e8' }} />expected 7.5 s</span>
            </div>
          </div>
        </div>
        <div className="statstrip reveal" style={{ marginTop: 18 }}>
          <div className="cell"><div className="num" style={{ fontFamily: 'var(--font-display)' }}>{betaFit.chi2Before}</div><div className="lab">χ²/dof before correction</div></div>
          <div className="cell"><div className="num cyan-text" style={{ fontFamily: 'var(--font-display)' }}>{betaFit.chi2After}</div><div className="lab">χ²/dof after correction</div></div>
          <div className="cell"><div className="num heat-text" style={{ fontFamily: 'var(--font-display)' }}>−{betaFit.chi2Reduction}%</div><div className="lab">χ² reduction</div></div>
          <div className="cell"><div className="num" style={{ fontFamily: 'var(--font-display)' }}>0.3σ</div><div className="lab">clean offset vs expected</div></div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [active, setActive] = useState(null)
  return (
    <section id="gallery">
      <div className="wrap">
        <div className="eyebrow reveal">Figure archive</div>
        <h2 className="section-title reveal">The plots behind the numbers</h2>
        <p className="lede reveal">Generated directly by the analysis pipeline. Click any figure to enlarge.</p>
        <div className="gallery">
          {gallery.map((g) => (
            <figure className="fig reveal" key={g.src} onClick={() => setActive(g)}>
              <img src={g.src} alt={g.title} loading="lazy" />
              <figcaption className="cap"><b>{g.title}</b><span>{g.caption}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <img src={active.src} alt={active.title} />
          <div className="lb-cap">{active.title} — {active.caption}</div>
        </div>
      )}
    </section>
  )
}

const methods = [
  { step: 'PIPELINE 01', title: 'Load, filter & clean', body: 'Read ~8,366 daily NetCDF dark-current files; keep background only (ODC=0, INT_TIME=15 s); threshold at 100 cts/s and re-wrap longitude from 0–360° to ±180° so the SAA is not split at the meridian.' },
  { step: 'PIPELINE 02', title: 'Timing correction', body: 'Classify ascending vs descending passes, fit 2D Gaussians to the SAA core, and bootstrap the peak-latitude separation. Confirms an End-of-Integration timestamp and shifts every coordinate back to the 7.5 s midpoint.' },
  { step: 'PIPELINE 03', title: 'Barycenter & drift', body: 'Intensity-weighted barycenters every 5th day (in R), a harmonic regression (sine/cosine + 11-yr + drift) for the drift rate, Haversine velocities, and a Mann-Kendall test for trend in velocity.' },
  { step: 'PIPELINE 04', title: 'Intensity & solar activity', body: 'Monthly 95th-percentile EGS rate vs sunspot number: lagged Pearson correlation (0–24 mo), an OLS model, a cross-correlation function, and an STL decomposition to isolate the long-term decline.' },
  { step: 'PIPELINE 05', title: 'Uncertainty quantification', body: 'Poisson √N error on every count rate, propagated analytically through the weighted-centroid, peak, and integrated-rate formulas; Gaussian-approximation validity confirmed (N ≫ 30).' },
  { step: 'PIPELINE 06', title: 'Shape & splitting', body: 'Spherical-harmonic contour fitting traces the yearly outline; k-means (k=2) clustering tests for a secondary barycenter and possible splitting of the anomaly.' },
  { step: 'PIPELINE 07', title: 'Beta-angle stratification', body: 'Correlate residual timing offsets with the orbital beta angle; a thermal-baseline null test outside the SAA rules out a thermal cause, isolating a geometric effect.' },
  { step: 'TOOLING', title: 'Python + R', body: 'Python for uncertainty, timing offsets, 2D Gaussian fitting, spatial gridding and bootstrapping; R for barycenter computation, harmonic/STL modeling, and spherical-harmonic shape analysis.' },
]

function Methods() {
  return (
    <section id="methods">
      <div className="wrap">
        <div className="eyebrow reveal">How it was done</div>
        <h2 className="section-title reveal">Methods &amp; uncertainty</h2>
        <div className="methods">
          {methods.map((m) => (
            <div className="method reveal" key={m.step}>
              <div className="step">{m.step}</div>
              <h4>{m.title}</h4>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
        <div className="disclaimer reveal">
          Notes on rigor: drift rates apply at TIMED's 600 km altitude and describe the main SAA lobe only.
          Part of the intensity decline may reflect gradual EGS sensor degradation (a few percent per year),
          not purely geophysical change. The secondary-lobe evidence is <b>tentative</b> — a forced k-means
          always returns two centers — and 2002–2003 are noisy (instrument scheduling and the 2003 X28 flare).
          These limitations are reported rather than smoothed over.
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div>
          <h3 className="heat-text">South Atlantic Anomaly</h3>
          <p>
            A CU Boulder Data Science Capstone with LASP, analysing 23 years of TIMED-SEE EGS
            dark-current data. This explorer visualizes the results — its source, the embedded
            result data, and the curated figures live in the repository below.
          </p>
          <p style={{ marginTop: 16 }} className="foot-meta">
            AUTHORS · {authors.join(' · ')}
          </p>
          <p style={{ marginTop: 16 }}>
            <a href={REPO} target="_blank" rel="noreferrer">github.com/nandinitata/saa-explorer ↗</a>
          </p>
        </div>
        <div className="foot-meta">
          DATA · TIMED-SEE EGS Level 0B<br />
          SPAN · 2002-01-22 → 2025-12-31<br />
          FILES · ~8,366 daily observations<br />
          FILTER · ODC=0 · INT_TIME=15 s<br />
          UNCERTAINTY · Poisson counting stats
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <div className="cosmos" />
      <div className="grain" />
      <Nav />
      <Hero />
      <StatStrip />
      <Findings />
      <DriftSection />
      <IntensitySection />
      <TimingSection />
      <ShapeSection />
      <Gallery />
      <Methods />
      <Footer />
    </>
  )
}
