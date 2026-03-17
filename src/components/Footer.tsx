import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <small className={styles.text}>
        © {year} Com-Arte Editora Laboratório. Todos os direitos reservados.
      </small>
    </footer>
  );
}
