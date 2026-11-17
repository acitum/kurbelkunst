import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownToLine, ArrowRight, Bike, CalendarDays, ChevronRight, ExternalLink, Flag, Heart, Instagram, Map, Menu, Mountain, Route, Snowflake, Sparkles, Trophy, Users, Wind, X, Check, LockKeyhole, AlertTriangle, } from 'lucide-react';
import './styles.css';
import Impressum from "./pages/Impressum";

const BASE = import.meta.env.BASE_URL;

const asset = p => p ? BASE + p.replace(/^\/+/, '') : null;

const LINKS = { strava: 'https://www.strava.com/clubs/2406705', instagram: 'https://www.instagram.com/kurbelkollektivwien/', komoot: 'https://www.komoot.com/de-de/user/kurbelkollektiv' };


function SnowRating({ n }) { return <span className="snowrating" aria-label={n ? `${n} von 5 Schneeflocken` : 'Noch nicht bewertet'}>{Array.from({ length: 5 }, (_, i) => <Snowflake key={i} size={15} strokeWidth={2.3} className={n && i < n ? 'active' : ''} />)}
</span>; }

function MotifCard({ m, index }) { let live = m.status === 'available' && m.gpx;
return <article className={'motif-card ' + (!live ? 'soon' : '')}>
<div className="motif-image">{m.image ? <img src={asset(m.image)} alt={`GPS-Zeichnung ${m.title}`} loading="lazy" /> : <div className="placeholder">
  <Snowflake size={50} strokeWidth={1} />
  <span>ART IN PROGRESS
  </span>
</div>}
<span className="index">{String(index + 1).padStart(2, '0')} / 10
</span>
<span className="category">{m.category || 'GPS Art'}
</span>
</div>
<div className="motif-content">
  <div className="motif-title">
    <h3>{m.title}
    </h3>{live ? <span className="status live">READY TO RIDE
  </span> : <span className="status">COMING SOON
</span>}
</div>
<p>{m.subtitle}
</p>
<div className="stats">
  <span>
    <Route size={17} />{m.distanceKm != null ? `${m.distanceKm.toLocaleString('de-AT')} km` : '— km'}
  </span>
  <span>
    <Mountain size={17} />{m.elevationM != null ? `${m.elevationM} hm` : '— hm'}
  </span>
</div>
<div className="card-bottom">
  <SnowRating n={m.difficulty} />{live ? <a className="download" href={asset(m.gpx)} download>
  <ArrowDownToLine size={17} /> GPX laden
</a> : <span className="locked">
<LockKeyhole size={15} /> Bald verfügbar
</span>}
</div>
</div>
</article>; }

function App() {
  if (window.location.pathname === "/impressum") {
    return <Impressum />;
  }
const [page, setPage] = useState('winter');
const [motifs, setMotifs] = useState([]);
const [board, setBoard] = useState({ participants: [], teams: [] });
const [filter, setFilter] = useState('all');
const [rank, setRank] = useState('art');
const [mobile, setMobile] = useState(false);
const [error, setError] = useState(''); useEffect(() => {
Promise.all([fetch(asset('motifs.json')).then(r => {
if (!r.ok)
throw Error('Motivdatei konnte nicht geladen werden');
return r.json();
}), fetch(asset('leaderboard.json')).then(r => r.json())]).then(([m, b]) => { setMotifs(m); setBoard(b); }).catch(e => setError(e.message));
}, []);
function nav(p) { setPage(p); setMobile(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } const shown = motifs.filter(m => filter === 'all' || (filter === 'available' ? m.status === 'available' : m.category === filter));
const rows = [...(rank === 'teams' ? board.teams : board.participants)].sort((a, b) => rank === 'km' ? (b.km || 0) - (a.km || 0) : (b.completed || 0) - (a.completed || 0));
return <>
<header className="header">
  <div className="header-inner">
    <button className="brand" onClick={() => nav('winter')} aria-label="Zur Startseite">
      <img src={asset('images/logo.png')} alt="Kurbel Kollektiv Wien Logo" />
      <span>KURBEL<span className="brand-accent">KUNST
      </span>
      <small>BY KURBELKOLLEKTIV WIEN
      </small>
    </span>
  </button>
  <nav className={mobile ? 'nav open' : 'nav'}>
    <button className={page === 'winter' ? 'selected' : ''} onClick={() => nav('winter')}>Winter Games
    </button>
    <button className={page === 'finale' ? 'selected' : ''} onClick={() => nav('finale')}>Grande Finale
    </button>
    <a href="#community" onClick={() => {
      setMobile(false); if (page !== 'winter')
      nav('winter');
      }}>Community
    </a>
  </nav>
  <button className="mobile-toggle" onClick={() => setMobile(!mobile)} aria-label="Menü öffnen">{mobile ? <X /> : <Menu />}
  </button>
</div>
</header>{page === 'winter' ? <>
<section className="hero">
  <div className="hero-deco one">✳</div>
  <div className="hero-deco two">✳</div>
  <div className="hero-inner">
    <div className="hero-copy">
      <span className="eyebrow">
        <Snowflake size={16} /> THE WINTER EDITION · 2026/27
      </span>
      <h1>WIEN IST<br />UNSERE <em>LEINWAND.</em>
    </h1>
    <p className="hero-sub">Ein Winter. Dein Rad als Zeichenstift. Mach aus deinen Kilometern kleine Meisterwerke.
    </p>
    <div className="hero-actions">
      <a className="btn primary" href="#collection">Motive entdecken <ArrowRight size={19} />
    </a>
    <a className="btn outline" href="#how">So funktioniert's
    </a>
    <a className="btn outline" href="#leaderboard">Leaderboard
    </a>
  </div>
  <div className="hero-caption">
    <span className="line" />RIDE IT. DRAW IT. COLLECT IT.
    </div>
  </div>
  <div className="hero-art">
    <div className="art-orbit">
      <img src={asset('images/logo.png')} alt="Waschbär-Maskottchen des Kurbel Kollektivs" />
    </div>
    <span className="art-spark a">✳</span>
    <span className="art-spark b">✳</span>
    <span className="art-spark c">✦</span>
  </div>
</div>
</section>
<section className="ticker">
  <div>NO RACING <span>✳</span> JUST DRAWING <span>✳</span> ALL BIKES WELCOME <span>✳</span> WINTER IS FOR RIDING <span>✳</span> NO RACING <span>✳</span> JUST DRAWING
  </div>
</section>

<section className="intro container" id="how">
  <div className="intro-left">
    <span className="kicker">01 / DIE IDEE</span>

    <h2>
      WENIGER WINTERSCHLAF.<br />
      <em>MEHR KURBELKUNST.</em>
    </h2>

    <div className="challenge-period">
      <span className="challenge-period-label">
        CHALLENGE-ZEITRAUM
      </span>

      <div className="challenge-period-dates">
        <CalendarDays size={30} strokeWidth={1.8} />
        <span>01.12.2026 — 28.02.2027</span>
      </div>
    </div>
  </div>

  <div className="intro-right">

  <p>Grauer Himmel? Kalte Finger? Der innere Schweinehund? Wir haben da was dagegen. Fahr durch Wien, zeichne mit deinem GPS-Track verrückte Motive und sammle deine ganz persönliche Winter-Kunstgalerie.
  </p>
  <p>Ob Citybike, Gravelbike oder Rennrad – hier zählen weder Bestzeiten noch Wattwerte. Nur die Lust aufs Losfahren.
  </p>
  <div className="steps">
    <div>
      <b>01</b>
      <strong>Motiv aussuchen
      </strong>
      <span>Such dir eine unserer GPS-Zeichnungen aus.
      </span>
    </div>
    <div>
      <b>02</b>
      <strong>Track fahren
      </strong>
      <span>GPX laden, navigieren und deine Fahrt aufzeichnen.
      </span>
    </div>
    <div>
      <b>03</b>
      <strong>Kunst sammeln
      </strong>
      <span>
        Zeig uns deine Zeichnung und sammle Motive!
        Tagge uns auf Strava oder Komoot oder schick uns
        den GPX-Track deiner Aktivität per Mail an{" "}
        <a href="mailto:deine-email@example.com">
            deine-email@gmail.com
        </a>
        {" "}und verrate uns noch deinen Namen, unter dem du
        auf dem Leaderboard erscheinen möchtest.
        </span>
    </div>
  </div>
</div>
</section>
<section className="collection" id="collection">
  <div className="container">
    <div className="section-head">
      <div>
        <span className="kicker">02 / DIE COLLECTION
        </span>
        <h2>10 MOTIVE.<br />
        <em>UNENDLICH VIEL SPASS.</em>
      </h2>
      <p>Jede Linie ist ein kleines Abenteuer. Such dir dein nächstes Kunstwerk aus.
      </p>
    </div>
    <div className="counter">
      <strong>{motifs.filter(m => m.status === 'available').length.toString().padStart(2, '0')}
        <span> / 10
        </span>
      </strong>
      <small>TRACKS VERFÜGBAR
      </small>
    </div>
  </div>
  <div className="filters">
    <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>Alle Motive
    </button>
    <button className={filter === 'available' ? 'on' : ''} onClick={() => setFilter('available')}>Jetzt fahrbar
    </button>
    <button className={filter === 'Mini Art' ? 'on' : ''} onClick={() => setFilter('Mini Art')}>Mini Art
    </button>
    <button className={filter === 'Medium Art' ? 'on' : ''} onClick={() => setFilter('Medium Art')}>Medium Art
    </button>
    <button className={filter === 'Big Art' ? 'on' : ''} onClick={() => setFilter('Big Art')}>Big Art
    </button>
  </div>{error && <p role="alert">{error}
</p>}
<div className="motif-grid">{shown.map((m) => <MotifCard key={m.id} m={m} index={motifs.indexOf(m)} />)}
</div>
<p className="notice">
  <AlertTriangle size={80} />
  <span>
    <strong>Wichtiger Hinweis:</strong> Die GPX-Tracks werden
    ausschließlich zur Orientierung bereitgestellt. Beim Befahren
    der Strecken sind sämtliche geltenden österreichischen
    Straßenverkehrsvorschriften, insbesondere die StVO, sowie
    Verkehrszeichen, Fahrverbote und etwaige Wegsperren zu beachten.
    Die Teilnahme und Nutzung der Routen erfolgen auf eigene
    Verantwortung. Das Kurbelkollektiv Wien übernimmt, soweit
    gesetzlich zulässig, keine Haftung für Unfälle, Schäden oder
    die Befahrbarkeit und Richtigkeit der bereitgestellten Routen.
  </span>
</p>
</div>
</section>
<section className="leader-section container" id="leaderboard">
  
<div className="section-head">
  <div>
    <span className="kicker">03 / DIE COMMUNITY</span>

    <h2>DIE <em>ART COLLECTORS.</em></h2>
    <p>
      Keine Bestzeiten. Hier zählt, wie viele unterschiedliche
      Kunstwerke du gesammelt hast.
    </p>
  </div>

  <div className="award-teaser">
    <div className="award-teaser-text">
      <strong>DER KÜNSTLER DES WINTERS?</strong>

      <span>
        Die fleißigsten Art Collectors dürfen sich
        beim Grande Finale über eine kleine
        Siegerehrung freuen.
      </span>
    </div>

    <Trophy size={56} strokeWidth={1.2} />
  </div>
</div>

<div className="board">
  <div className="board-head">
    <div className="board-tabs">
      <button className={rank === 'art' ? 'active' : ''} onClick={() => setRank('art')}>Einzelwertung · Motive
      </button>
      <button className={rank === 'km' ? 'active' : ''} onClick={() => setRank('km')}>Kilometer
      </button>
      <button className={rank === 'teams' ? 'active' : ''} onClick={() => setRank('teams')}>Teams
      </button>
    </div>
  </div>{rows.length === 0 ? <div className="empty">
  <Sparkles size={32} />
  <h3>Die Bühne ist noch frei!
  </h3>
  <p>Hier erscheinen die Art Collectors, sobald die Challenge gestartet ist. Die Rangliste wird über <code>public/leaderboard.json</code> gepflegt.
  </p>
</div> : <div className="board-rows">{rows.map((p, i) => <div className="board-row" key={p.name}>
<span className="ranknum">{String(i + 1).padStart(2, '0')}
</span>
<strong>{p.name}
</strong>
<div className="progress">
  <span style={{ width: `${Math.min(100, (p.completed || 0) / 10 * 100)}%` }} />
</div>
<b>{p.completed || 0}
<small>/10 Motive
</small>
</b>
<span>{p.km || 0} km
</span>
</div>)}
</div>}
</div>
 <div className="submission-notice">
  <div className="submission-notice-title">
  SO KOMMST DU AUFS LEADERBOARD
  </div>

  <p>
    Zeig uns deine Zeichnung! Tagge uns auf Strava oder Komoot
    oder schick uns den GPX-Track deiner Aktivität per Mail an{" "}
    <a href="mailto:deine-email@gmail.com">
      deine-email@gmail.com
    </a>
    . Verrate uns außerdem, unter welchem Namen du auf dem
    Leaderboard erscheinen möchtest.
  </p>
</div>
</section>
<section className="finale-promo">
  <div className="container promo-inner">
    <div>
      <span className="kicker">04 / DAS GROSSE FINALE
      </span>
      <h2>ONE TRACK <br />
      <em>ONE TEAM</em>
    </h2>
    <p> Den Künstler in dir entdeckt?! Dann bleib gespannt! Wir haben noch etwas Großes vor.
    </p>
    <button className="btn primary" onClick={() => nav('finale')}>Psssst ... Bald mehr! <ArrowRight size={18} />
  </button>
</div>
<img src={asset('images/logo.png')} alt="Kurbel Kollektiv Waschbär" />
</div>
</section>
</> : <main className="finale-page">
<section className="finale-hero container">
  <span className="eyebrow">
    <Flag size={17} /> THE GRAND FINALE
  </span>
  <h1>GRANDE 
  <em> FINALE</em>
</h1>
<p className="finale-intro">
  <strong className="finale-aufgewaermt">
    AUFGEWÄRMT?!
  </strong>
  <br />
  Zum Abschluss der Winter Games wird Wien nochmals
  zu unserer Leinwand.
</p>

<div className="finale-banner">
  <img src={asset('images/logo.png')} alt="Waschbär-Logo" />
  <div>
    <span className="kicker">DIE FINAL MISSION
    </span>
    <h2>LET'S DRAW<br />TOGETHER!
    </h2>
    <p className="finale-stay-tuned">
  ... STAY TUNED!
</p>

  </div>
</div>
<div className="finale-steps">
  <div>
    <Users />
    <h3>TEAM UP
    </h3>
    <p>Finde deine Crew.
    </p>
  </div>
  <div>
    <Bike />
    <h3>RIDE YOUR LINE
    </h3>
    <p>Fahrt zusammen oder teilt euch auf. Kein Rennen, sondern ein gemeinsames Projekt.
    </p>
  </div>
  <div>
    <Heart />
    <h3>CELEBRATE
    </h3>
    <p>Tracks zusammensetzen, das Kunstwerk enthüllen und gemeinsam feiern.
    </p>
  </div>
</div>
<div className="finale-note">
  <CalendarDays />
  <div>
    <strong>Termin & Treffpunkt folgen.
    </strong>
    <p>Details zur Anmeldung, Streckenaufteilung und Abschlussparty veröffentlichen wir hier, sobald sie feststehen.
    </p>
  </div>
</div>
</section>
</main>}
<footer id="community">
  <div className="container footer-main">
    <div>
      <img src={asset('images/logo.png')} alt="Kurbel Kollektiv Wien" />
      <h2>KURBELKUNST.
      </h2>
      <p>Ride it. Draw it. Collect it.<br />Eine Winter Challenge vom Kurbelkollektiv Wien.
      </p>
    </div>
    <div>
      <span>FIND US OUT THERE
      </span>
      <a href={LINKS.strava} target="_blank" rel="noreferrer">Strava Club <ExternalLink size={15} />
    </a>
    <a href={LINKS.komoot} target="_blank" rel="noreferrer">Komoot <ExternalLink size={15} />
  </a>
  <a href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={15} />
</a>
</div>
<div>
  <span>EXPLORE
  </span>
  <button onClick={() => nav('winter')}>Winter Games <ChevronRight size={15} />
</button>
<button onClick={() => nav('finale')}>Grande Finale <ChevronRight size={15} />
</button>
</div>
</div>
<div className="container footer-bottom">
  <span>© {new Date().getFullYear()} Kurbelkollektiv Wien · Community-Projekt
  </span>
  <span>MADE FOR COLD DAYS & GOOD RIDES
  </span>
  <a href="/impressum" className="footer-link">
    Impressum
  </a>
</div>
</footer>
</>;
}
;
createRoot(document.getElementById('root')).render(<App />);
