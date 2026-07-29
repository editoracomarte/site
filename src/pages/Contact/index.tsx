import { Fragment } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useContactQuery } from '@/queries/contact';
import { addressLine, addressLocality, phoneAriaLabel, phoneHref } from '@/utils/contact';
import styles from './Contact.module.css';

export function Contact() {
  const { data, isLoading } = useContactQuery();

  const content = data?.content ?? [];
  const address = data?.address;

  const addressLines = [
    data?.organization,
    address ? addressLine(address) : null,
    address ? addressLocality(address) : null,
  ].filter(Boolean) as string[];

  return (
    <main className="container">
      <section className={styles.contact}>
        <h1>
          <span className={styles.paper}>Contato</span>
        </h1>
        {!isLoading && content.length > 0 && <BlocksRenderer content={content} />}
        {data && (addressLines.length > 0 || data.phone || data.email) && (
          <address>
            {addressLines.map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
            {data.phone && (
              <span>
                telefone:{' '}
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
        )}
      </section>
    </main>
  );
}
