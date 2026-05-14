import styles from './AboutUs.module.css';

interface CreditEntry {
  role: string;
  people: (string | { name: string; affiliation: string })[];
}

interface CreditSection {
  title: string;
  entries: CreditEntry[];
}

const credits: CreditSection[] = [
  {
    title: 'Universidade de São Paulo',
    entries: [
      { role: 'reitor', people: ['Aluisio Augusto Cotrim Segura'] },
      { role: 'vice-reitora', people: ['Liedi Légi Bariani Bernucci'] },
    ],
  },
  {
    title: 'Escola de Comunicação e Artes',
    entries: [
      { role: 'diretora', people: ['Maria Clotilde Perez Rodrigues'] },
      { role: 'vice-diretor', people: ['Mário Rodrigues Videira Junior'] },
    ],
  },
  {
    title: 'Departamento de Jornalismo e Editoração (CJE)',
    entries: [
      { role: 'chefe', people: ['Wagner Souza e Silva'] },
      { role: 'vice-chefe', people: ['Dennis de Oliveira'] },
    ],
  },
  {
    title: 'Com-Arte Editora Laboratório',
    entries: [
      {
        role: 'professores responsáveis',
        people: ['Hugo Quinta', 'Marisa Midori Deaecto', 'Thiago Mio Salla'],
      },
      { role: 'secretário editorial e arte finalista', people: ['Diego Nóbrega'] },
      {
        role: 'corpo discente',
        people: ['Alunos e alunas das disciplinas Laboratório de Produção Editorial I, II e III'],
      },
    ],
  },
  {
    title: 'Conselho Editorial',
    entries: [
      {
        role: '',
        people: [
          { name: 'Ana Elisa Ribeiro', affiliation: 'Cefet-UFMG' },
          { name: 'Aníbal Bragança', affiliation: 'UFF, in memoriam' },
          { name: 'Cristiane Silvestrin', affiliation: 'Edusp' },
          { name: 'Eugênio Bucci', affiliation: 'ECA/USP' },
          { name: 'Fernando Paixão', affiliation: 'IEB/USP' },
          { name: 'Nuno Medeiros', affiliation: 'Universidade de Lisboa' },
          { name: 'Patricia Sorel', affiliation: 'Université Paris Nanterre' },
          { name: 'Rodrigo Camargo de Godoi', affiliation: 'Unicamp' },
          { name: 'Tania Regina de Luca', affiliation: 'Unesp' },
        ],
      },
    ],
  },
];

function CreditEntry({ entry }: { entry: CreditEntry }) {
  return (
    <div className={styles.creditEntry}>
      {entry.role && <span className={styles.role}>{entry.role}</span>}
      <div className={styles.people}>
        {entry.people.map((person, idx) => (
          <p key={idx} className={styles.person}>
            {typeof person === 'string' ? (
              person
            ) : (
              <>
                {person.name}
                <span className={styles.affiliation}> ({person.affiliation})</span>
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export function AboutUs() {
  return (
    <main className="container">
      <section className={styles.about}>
        <h1>
          <span className={styles.paper}>Quem Somos</span>
        </h1>
        <p>
          A produção de uma editora define seu estilo. Esse trabalho envolve a seleção de originais,
          a preparação e revisão de texto, a diagramação, entre outras etapas do processo de
          transformação do texto em livro. Trata-se de um ofício colaborativo, exercido por
          profissionais que almejam aprimorar a linguagem textual, visual e gráfica das obras
          publicadas.
        </p>
        <p>
          Fundada em 1972, a Com-Arte (Editora-Laboratório do Curso de Editoração da ECA-USP) prima
          por publicar livros que levam em conta a produção editorial, indo do autor ao leitor. Seu
          catálogo abarca a editoração, a literatura, os livros infantojuvenis, o jornalismo, a
          música, a psicologia, a comunicação, as artes, a educação, as memórias e biografias, os
          quadrinhos e as humanidades em geral. Muitas dessas obras resultam de trabalhos
          acadêmicos, e uma parte considerável do conjunto corresponde a livros sobre livros.
        </p>
        <p>
          Com aproximadamente trezentos títulos publicados, a Com-Arte consolida-se como um espaço
          de aprendizado e inovação editorial, contribuindo para a formação técnica e humanística de
          futuros profissionais do livro, além de oferecer aos leitores um rico acervo de obras que
          dificilmente ganharia acolhida em outra editora.
        </p>
      </section>
      <section className={styles.about}>
        <h2>
          <span className={styles['paper-reversed']}>Créditos Institucionais</span>
        </h2>
        {credits.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            {section.entries.map((entry, idx) => (
              <CreditEntry key={idx} entry={entry} />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
