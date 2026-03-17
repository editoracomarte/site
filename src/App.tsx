import { NavLink, Route, Routes } from "react-router-dom";
import { About } from "./pages/About.tsx";
import { Home } from "./pages/Home.tsx";
import { NotFound } from "./pages/NotFound.tsx";

function App() {
  return (
    <>
      <header style={{ padding: "12px 16px" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
