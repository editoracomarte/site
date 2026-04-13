import { NavLink } from "react-router-dom";
import logo from "@/assets/logo-comarte.svg";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header>
      <NavLink to="/" className={styles.brand} aria-label="Ir para início">
        <img className={styles.logo} src={logo} alt="Comarte" />
      </NavLink>

      <nav>
        <NavLink to="/" end className={styles.link}>
          início
        </NavLink>
        <NavLink to="/catalogo" className={styles.link}>
          catálogo
        </NavLink>
        <NavLink to="/autores" className={styles.link}>
          autores
        </NavLink>
        <NavLink to="/quem-somos" className={styles.link}>
          quem somos
        </NavLink>
        <NavLink to="/contato" className={styles.link}>
          contato
        </NavLink>
      </nav>
    </header>
  );
}
