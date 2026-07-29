import { Fragment } from 'react';
import { useContactQuery } from '@/queries/contact';
import { addressLine, addressLocality, phoneAriaLabel, phoneHref } from '@/utils/contact';
import styles from './Footer.module.css';

export function Footer() {
  const { data } = useContactQuery();

  const year = new Date().getFullYear();
  const copyright =
    data?.copyright ?? `© ${year} Com-Arte Editora Laboratório. Todos os direitos reservados.`;

  const address = data?.address;
  const addressLines = [
    data?.organization,
    address ? addressLine(address) : null,
    address ? addressLocality(address) : null,
  ].filter(Boolean) as string[];

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
        {data && (addressLines.length > 0 || data.phone || data.email) && (
          <section className={styles.address}>
            <span className="sr-only">Endereço:</span>
            <address>
              {addressLines.map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))}
              {data.phone && (
                <span>
                  tel.{' '}
                  <a href={phoneHref(data.phone)} aria-label={phoneAriaLabel(data.phone)}>
                    {data.phone}
                  </a>
                  <br />
                </span>
              )}
              {data.email && (
                <span>
                  e-mail: <a href={`mailto:${data.email}`}>{data.email}</a>
                </span>
              )}
            </address>
          </section>
        )}
      </section>
      <section className={styles.copyright}>
        <small>{copyright}</small>
      </section>
    </footer>
  );
}
