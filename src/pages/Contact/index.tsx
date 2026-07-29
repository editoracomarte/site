import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useContactQuery } from '@/queries/contact';
import { addressLine, addressLocality, phoneAriaLabel, phoneHref } from '@/utils/contact';
import styles from './Contact.module.css';

export function Contact() {
  const { data, isLoading } = useContactQuery();

  const content = data?.content ?? [];

  return (
    <main className="container">
      <section className={styles.contact}>
        <h1>
          <span className={styles.paper}>Contato</span>
        </h1>
        {!isLoading && content.length > 0 && <BlocksRenderer content={content} />}
        {data && (
          <address>
            {data.organization}
            <br />
            {addressLine(data.address)}
            <br />
            {addressLocality(data.address)}
            <br />
            <span>
              telefone:{' '}
              <a href={phoneHref(data.phone)} aria-label={phoneAriaLabel(data.phone)}>
                {data.phone}
              </a>
              <br />
            </span>
            <span>
              e-mail: <a href={`mailto:${data.email}`}>{data.email}</a>
            </span>
          </address>
        )}
      </section>
    </main>
  );
}
