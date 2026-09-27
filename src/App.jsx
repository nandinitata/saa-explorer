import { useEffect, useRef, useState } from 'react'
import {
  ResponsiveContainer, ComposedChart, Line, Area, BarChart, Bar, Cell,
  ScatterChart, Scatter, ErrorBar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine,
} from 'recharts'
import {
  yearlyMetrics, driftFit, offsetVsBeta, betaFit, headline, gallery,
} from './data.js'

const REPO = 'https://github.com/nandinitata/LASP-Project'

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
        <a href="#charts">Data</a>
        <a href="#timing">Timing</a>
        <a href="#gallery">Figures</a>
        <a href="#methods">Methods</a>
      </div>
      <a className="ghlink" href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero wrap">
      <div className="kicker reveal">LASP · CU Boulder Data Science Capstone · 2002–2024</div>
      <h1 className="reveal">
        The <span className="heat-text">Drifting</span><br />Anomaly
      </h1>
      <p className="sub reveal">
        The South Atlantic Anomaly is where Earth's inner radiation belt dips closest to the
        surface. Using {headline.years} years of TIMED-SEE dark-current data, this project maps
        how it moves, brightens with the solar cycle, and — unexpectedly — pins down a satellite
        timing-calibration question hidden in the numbers.
      </p>
      <div className="chips reveal">
        <div className="chip"><b>{headline.files.toLocaleString()}</b> daily observations</div>
        <div className="chip"><b>EGS</b> dark current · 15&nbsp;s integration</div>
        <div className="chip"><b>Poisson</b> counting-statistics uncertainty</div>
        <div className="chip"><b>{headline.windows}</b> timing windows analysed</div>
      </div>
      <div className="scrollcue reveal"><span className="bar" />Scroll to explore</div>
    </header>
  )
}

function StatStrip() {
  const stats = [
    { num: <><span className="heat-text">{headline.driftRate}</span>°/yr</>, lab: 'Westward drift (sign confirmed)' },
    { num: <><span className="cyan-text">+{headline.solarPct}%</span></>, lab: 'Intensity, solar min vs max' },
    { num: <>7.27<small style={{ fontSize: '.5em' }}> s</small></>, lab: 'True timing offset (±0.69 s)' },
    { num: <><span className="cyan-text">45%</span></>, lab: 'Offset variance from β angle' },
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
    cls: 'c-heat', tag: 'Position', idx: '01', title: 'Westward drift, reported honestly',
    body: 'The SAA centroid drifts west with the expected sign, but across only five well-separated epochs the trend is not statistically significant and sits below the historical 0.28–0.43°/yr range. Latitude stays stable near −26° to −27.5°.',
    metric: <>−0.176 <small>°/yr · R²=0.61 · p=0.12</small></>,
  },
  {
    cls: 'c-cyan', tag: 'Intensity', idx: '02', title: 'The anomaly breathes with the Sun',
    body: 'Peak background count rate is markedly higher at solar minimum than at solar maximum — at solar max the expanded, heated thermosphere increases absorption and modulates trapped-particle flux.',
    metric: <>1919 vs 1583 <small>cts/s · ~21% higher at min</small></>,
  },
  {
    cls: 'c-violet', tag: 'Calibration', idx: '03', title: 'TIME marks the end of integration',
    body: 'Comparing ascending vs descending SAA peak latitudes, every one of 16 windows shows ascending peaks north of descending — the unambiguous signature that the reported timestamp labels the end of each 15 s exposure.',
    metric: <>16 / 16 <small>windows · ΔLat &gt; 0</small></>,
  },
  {
    cls: 'c-cyan', tag: 'Confound', idx: '04', title: 'A geometric β-angle confound',
    body: 'The window-to-window scatter is not noise: the signed orbital beta angle explains ~45% of it. The out-of-SAA thermal baseline shows no β dependence, so the effect is geometric — and correcting for it recovers the expected offset.',
    metric: <>7.273 ± 0.691 s <small>· 0.3σ from 7.5 s</small></>,
  },
]

function Findings() {
  return (
    <section id="findings">
      <div className="wrap">
        <div className="eyebrow reveal">Key findings</div>
        <h2 className="section-title reveal">Four results, one dataset</h2>
        <p className="lede reveal">
          Every number below carries an error bar propagated from counting statistics — the project's
          deliberate shift from bootstrap heuristics to defensible Poisson/Gaussian uncertainty.
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

function DataSection() {
  return (
    <section id="charts">
      <div className="wrap">
        <div className="eyebrow reveal">Position &amp; intensity</div>
        <h2 className="section-title reveal">Where it is, and how bright</h2>
        <p className="lede reveal">
          Five epochs across two decades. The centroid creeps west while its latitude holds; the
          peak rate rises and falls with the solar cycle.
        </p>
        <div className="chart-grid">
          <div className="panel reveal">
            <div className="p-head">
              <h4>Westward drift of the centroid</h4>
              <span className="p-note">lon vs year</span>
            </div>
            <p className="p-desc">Linear fit −0.176°/yr (not significant, p=0.12). More negative = further west.</p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={driftData} margin={{ top: 6, right: 12, bottom: 4, left: -8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="year" tick={AXIS} axisLine={{ stroke: GRID }} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} domain={[-54, -42]} tickFormatter={(v) => `${v}°`} />
                <Tooltip content={<DriftTip />} cursor={{ stroke: 'rgba(140,165,220,0.3)' }} />
                <Line type="monotone" dataKey="fit" stroke="#8a7bff" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
                <Line type="monotone" dataKey="lon" stroke="#ff5a45" strokeWidth={2.5} dot={{ r: 5, fill: '#ff5a45', stroke: '#04060e', strokeWidth: 2 }} activeDot={{ r: 7 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="legend">
              <span><i style={{ background: '#ff5a45' }} />measured centroid</span>
              <span><i style={{ background: '#8a7bff' }} />linear fit</span>
            </div>
          </div>

          <div className="panel reveal">
            <div className="p-head">
              <h4>Peak rate &amp; the solar cycle</h4>
              <span className="p-note">cts/s vs year</span>
            </div>
            <p className="p-desc">Solar-minimum years (2009, 2019) run ~21% hotter than solar-max years.</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={yearlyMetrics} margin={{ top: 6, right: 12, bottom: 4, left: -8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="year" tick={AXIS} axisLine={{ stroke: GRID }} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} domain={[1400, 2000]} />
                <Tooltip content={<IntensityTip />} cursor={{ fill: 'rgba(140,165,220,0.06)' }} />
                <ReferenceLine y={1919} stroke="#3ce0e8" strokeDasharray="4 4" strokeOpacity={0.6} />
                <ReferenceLine y={1583} stroke="#ff9d3c" strokeDasharray="4 4" strokeOpacity={0.6} />
                <Bar dataKey="peak" radius={[5, 5, 0, 0]} maxBarSize={54}>
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
  { step: 'STEP 01', title: 'Load & filter', body: 'Read ~8,366 daily NetCDF dark-current files, keeping only background measurements (ODC=0, INT_TIME=15 s).' },
  { step: 'STEP 02', title: 'Centroid & drift', body: 'Intensity-weighted centroiding above a count threshold, then linear fits with confidence intervals for position and drift.' },
  { step: 'STEP 03', title: 'Counting statistics', body: 'Every derived quantity carries Poisson √N error propagated through, with Gaussian-regime validity checks.' },
  { step: 'STEP 04', title: 'Ascending vs descending', body: 'Split each pass by direction and compare SAA peak latitudes to detect the integration-timing offset.' },
  { step: 'STEP 05', title: 'Beta stratification', body: 'Correlate offsets with the orbital beta angle; a thermal-baseline null test rules out a thermal cause.' },
  { step: 'STEP 06', title: 'Clean-window estimate', body: 'Deep-negative-β, yaw-free windows give the least-biased timing offset: 7.273 ± 0.691 s.' },
]

function Methods() {
  return (
    <section id="methods">
      <div className="wrap">
        <div className="eyebrow reveal">How it was done</div>
        <h2 className="section-title reveal">Method &amp; uncertainty</h2>
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
          Note on rigor: the westward-drift trend is directionally consistent with the known geomagnetic
          drift but is <b>not statistically significant</b> at five epochs (p = 0.12) and falls below the
          historical 0.28–0.43°/yr literature range. This limitation is reported rather than smoothed over.
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
            dark-current data. All analysis code, generated figures, reports, and the full results
            writeup live in the project repository.
          </p>
          <p style={{ marginTop: 18 }}>
            <a href={REPO} target="_blank" rel="noreferrer">github.com/nandinitata/LASP-Project ↗</a>
            {'  ·  '}
            <a href={`${REPO}/blob/main/RESULTS.md`} target="_blank" rel="noreferrer">RESULTS.md ↗</a>
          </p>
        </div>
        <div className="foot-meta">
          DATA · TIMED-SEE EGS Level 0B<br />
          SPAN · 2002-01-22 → 2024-12-31<br />
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
      <DataSection />
      <TimingSection />
      <Gallery />
      <Methods />
      <Footer />
    </>
  )
}
