import styles from './Contact.module.css';

export function Contact() {
  return (
    <main className="container">
      <section className={styles.contact}>
        <h1>
          <span className={styles.paper}>Contato</span>
        </h1>
        <p>
          <span className={styles.highlight}>
            Com-Arte — Editora-Laboratório do Curso de Editoração
          </span>
        </p>
        <p>
          Escola de Comunicação e Artes
          <br />
          Universidade de São Paulo
        </p>
        <address>
          Departamento de Jornalismo e Editoração (CJE)
          <br />
          Av. Prof. Lúcio Martins Rodrigues, 443 — Prédio 2 — Sala 10
          <br />
          Cidade Universitária, CEP 05508-020 — São Paulo — SP — Brasil
          <br />
          <span>
            telefone:{' '}
            <a href="tel:+551130914016" aria-label="DDD 11 3 0 9 1 4 0 1 6">
              (11) 3091-4016
            </a>
            <br />
          </span>
          <span>
            e-mail: <a href="mailto:editoracomarte@usp.br">editoracomarte@usp.br</a>
          </span>
        </address>
      </section>
    </main>
  );
}
