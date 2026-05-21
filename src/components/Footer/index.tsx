import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <section className={styles.info}>
        <section className={styles.supporters}>
          <span className="sr-only">Com apoio de:</span>
          <img src="/usp.svg" className={styles.usp} alt="Universidade de São Paulo" />
          <img src="/eca.svg" className={styles.eca} alt="Escola de Artes e Comunicação da USP" />
          <img
            src="/cje.svg"
            className={styles.cje}
            alt="Departamento de Jornalismo e Editoração da ECA-USP"
          />
        </section>
        <section className={styles.address}>
          <span className="sr-only">Endereço:</span>
          <address>
            Av. Prof. Lúcio Martins Rodrigues, 443 – Prédio 2 – Sala 10
            <br />
            CEP 05508-020 – Cidade Universitária – São Paulo, SP – Brasil
            <br />
            <a href="tel:+551130914016" aria-label="Telefone DDD 11 3 0 9 1 4 0 1 6">
              (11) 3091-4016
            </a>
            <br />
            <a href="mailto:editoracomarte@usp.br">
              <span className="sr-only">Email:</span>editoracomarte@usp.br
            </a>
          </address>
        </section>
      </section>
      <section className={styles.copyright}>
        <small>© {year} Com-Arte Editora Laboratório. Todos os direitos reservados.</small>
      </section>
    </footer>
  );
}
