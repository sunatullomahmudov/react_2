import { useSelector } from "react-redux";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ProductList from "./componnents/ProductList";
import SearchBar from "./componnents/SearchBar";

const App = () => {
  const { data, loading } = useSelector((state: any) => state.products);
  const active = data.filter((user: any) => user.status === true).length;

  return (
    <div className="app-shell">
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <div className="site-frame">
        <header className="topbar">
          <div className="brand"><span className="brand-symbol">✦</span><span>ORBIT<span className="brand-period">.</span></span><span className="brand-caption">PEOPLE / SYSTEM</span></div>
          <div className="topbar-right"><span className="signal-dot" /> SYSTEM ONLINE <span className="topbar-divider" /> 001—{String(data.length).padStart(3, "0")}</div>
        </header>

        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="kicker-line" /> THE HUMAN SIDE OF YOUR WORKSPACE <AutoAwesomeRoundedIcon sx={{ fontSize: 15 }} /></div>
              <h1 id="hero-title">A universe<br />of <span>people.</span></h1>
              <p>Every connection has a story. Keep yours beautifully in orbit.</p>
              <div className="hero-meta"><span className="meta-line" /><span>DISCOVER YOUR DIRECTORY</span><ArrowOutwardRoundedIcon sx={{ fontSize: 15 }} /></div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-halo art-halo-outer" /><div className="art-halo art-halo-inner" />
              <div className="art-ring art-ring-one" /><div className="art-ring art-ring-two" />
              <div className="art-core"><span className="art-core-glow" /><PeopleAltOutlinedIcon /></div>
              <span className="art-orbit-dot dot-one" /><span className="art-orbit-dot dot-two" /><span className="art-orbit-dot dot-three" />
              <span className="art-coord coord-one">40° 42′ 16″ N</span><span className="art-coord coord-two">CONNECTED / 001</span>
              <span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span>
            </div>

            <div className="hero-stats">
              <div className="hero-stat"><span className="stat-index">01 / TOTAL PEOPLE</span><strong>{loading ? "··" : String(data.length).padStart(2, "0")}</strong><span className="stat-note">In your circle <ArrowOutwardRoundedIcon sx={{ fontSize: 13 }} /></span></div>
              <div className="hero-stat"><span className="stat-index">02 / ACTIVE NOW</span><strong>{loading ? "··" : String(active).padStart(2, "0")}</strong><span className="stat-note"><span className="tiny-live-dot" /> Currently connected</span></div>
            </div>
          </section>

          <section className="directory" aria-labelledby="directory-title">
            <div className="section-head"><div><span className="section-overline">THE COLLECTION <span> / </span> 01</span><h2 id="directory-title">Your constellation<span>.</span></h2><p>Every person in your orbit, at a glance.</p></div><span className="section-decoration">✳</span></div>
            <SearchBar />
            <ProductList />
          </section>
        </main>

        <footer className="footer"><span>ORBIT<span className="brand-period">.</span> PEOPLE / SYSTEM</span><span>DESIGNED FOR HUMAN CONNECTION <span className="footer-glyph">✦</span></span></footer>
      </div>
    </div>
  );
};

export default App;
