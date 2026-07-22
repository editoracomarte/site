import styles from './Publish.module.css';

export function Publish() {
  return (
    <main className="container">
      <section className={styles.publish}>
        <h1>
          <span className={styles.paper}>Seleção de originais</span>
        </h1>
        <p>
          Agradecemos o interesse em publicar sua obra pela Com-Arte, Editora-Laboratório do Curso
          de Editoração da Escola de Comunicações e Artes da Universidade de São Paulo (ECA-USP).
        </p>
        <p>
          Por se tratar de uma editora universitária cuja meta é formar alunos do referido curso, os
          processos de seleção, produção editorial e publicação do livro costumam demorar mais do
          que o esperado em uma editora comercial.
        </p>
        <p>
          O catálogo da Com-Arte abarca títulos de ficção e não ficção, reunindo obras de diversas
          áreas do conhecimento. Há desde títulos resultantes de pesquisas de ponta na área de
          livros sobre livros, como também publicamos ensaios, romances, novelas, contos, crônicas e
          poesia.
        </p>
        <p>
          A avaliação dos originais submetidos ocorre por meio da disciplina Critérios de Seleção de
          Originais (CJE 0394), ministrada pelo professor Hugo Quinta, que também é um dos docentes
          responsáveis pela Com-Arte. A disciplina é oferecida no primeiro semestre letivo de cada
          ano, habitualmente entre março e julho.
        </p>
        <p>
          Caso você tenha interesse em submeter seu original para avaliação da Com-Arte, envie seu
          manuscrito para o e-mail institucional da editora (
          <a href="mailto:editoracomarte@usp.br">editoracomarte@usp.br</a>) com a autorização de o
          trabalho ser avaliado na disciplina. Os originais submetidos até o mês de fevereiro entram
          no fluxo de avaliação da disciplina, já os originais submetidos a partir do mês de março
          serão avaliados no primeiro semestre letivo do ano seguinte.
        </p>
        <p>
          O parecer dos manuscritos submetidos será enviado ao autor entre agosto e setembro.
          Ressaltamos que o parecer dos alunos e alunas da disciplina não resulta em aprovação da
          publicação, uma vez que o julgamento discente passa pelo escrutínio dos três docentes
          responsáveis pela editora - Hugo Quinta, Marisa Midori Deaecto e Thiago Mio Salla.
        </p>
        <p>
          O processo de seleção dos originais submetidos à Com-Arte é de inestimável relevância para
          a formação de futuros editores humanistas, que têm a oportunidade de avaliar os originais
          apresentados à casa do curso de Editoração da ECA-USP.
        </p>
      </section>
    </main>
  );
}
