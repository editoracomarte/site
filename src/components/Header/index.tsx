import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo-comarte.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <header>
      <NavLink to="/" className={styles.brand} aria-label="Ir para início">
        <img className={styles.logo} src={logo} alt="Comarte" />
      </NavLink>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.activeLink}` : ''}`}
        >
          início
        </NavLink>
        <NavLink
          to="/catalogo"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.activeLink}` : ''}`}
        >
          catálogo
        </NavLink>
        <NavLink
          to="/autores"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.activeLink}` : ''}`}
        >
          autores
        </NavLink>
        <NavLink
          to="/quem-somos"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.activeLink}` : ''}`}
        >
          quem somos
        </NavLink>
        <NavLink
          to="/publique"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.activeLink}` : ''}`}
        >
          publique
        </NavLink>
        <NavLink
          to="/contato"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.activeLink}` : ''}`}
        >
          contato
        </NavLink>
      </nav>
    </header>
  );
}
