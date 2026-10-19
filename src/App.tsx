import { useSelector } from "react-redux";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ProductList from "./componnents/ProductList";
import SearchBar from "./componnents/SearchBar";

const App = () => {
  const { data, loading } = useSelector((state: any) => state.products);
  const active = data.filter((user: any) => user.status === true).length;

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="dashboard">
        <header className="topbar">
          <div className="brand"><span className="brand-mark"><span /></span><span>orbit<span className="brand-dot">.</span></span><span className="brand-divider" /><span className="brand-label">PEOPLE SPACE</span></div>
          <div className="topbar-badge"><span className="live-dot" /> YOUR WORKSPACE</div>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><AutoAwesomeRoundedIcon sx={{ fontSize: 15 }} /> YOUR PEOPLE, ALL IN ONE PLACE</div>
              <h1>People, <span>in focus.</span></h1>
              <p>A little more clarity for the people behind your work.<br className="desktop-break" /> Your entire directory, beautifully organized.</p>
            </div>
            <div className="hero-visual" aria-hidden="true"><div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" /><div className="visual-core"><PeopleAltOutlinedIcon /></div><span className="visual-spark spark-one">✦</span><span className="visual-spark spark-two">✧</span></div>
          </section>

          <section className="directory" aria-label="People directory">
            <div className="directory-heading">
              <div><div className="section-kicker">YOUR DIRECTORY <span> / </span> 01</div><h2>All people <span className="count-badge">{loading ? "—" : data.length}</span></h2><p>Manage and stay connected with your people.</p></div>
              <div className="directory-summary"><span className="summary-icon"><PeopleAltOutlinedIcon /></span><span><strong>{loading ? "—" : active}</strong><small>ACTIVE MEMBERS</small></span><span className="summary-spark">✳</span></div>
            </div>
            <SearchBar />
            <ProductList />
          </section>
        </main>
        <footer className="footer"><span>© ORBIT PEOPLE SPACE</span><span>MADE FOR BETTER CONNECTIONS <span className="footer-star">✦</span></span></footer>
      </div>
    </div>
  );
};

export default App;
