import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <address>
        Av. Prof. Lúcio Martins Rodrigues, 443 – Prédio 2 – Sala 10<br/>
        CEP 05508-020 – Cidade Universitária – São Paulo, SP – Brasil
      </address>
      <p>
        Telefone: <a href="tel:+551130914016">(11) 3091-4016</a>
      </p>
      <p>
        Email: <a href="mailto:editoracomarte@usp.br">editoracomarte@usp.br</a>
      </p>
      <small>
        © {year} Com-Arte Editora Laboratório. Todos os direitos reservados.
      </small>
    </footer>
  );
}
