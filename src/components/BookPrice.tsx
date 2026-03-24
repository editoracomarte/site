import { Button } from "./Button";
import styles from "./BookPrice.module.css";

interface BookPriceSectionProps {
  price: number;
  onCartClick?: () => void;
}

export function BookPriceSection({ price, onCartClick }: BookPriceSectionProps) {
  if (price <= 0) {
    return (
      <div className={styles.priceSection}>
        <div className={styles.priceContent}>
          <div className={styles.priceInfo}>
            <span className={styles.label}>Preço</span>
            <span className={styles.freeTag}>Gratuito</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.priceSection}>
      <div className={styles.priceContent}>
        <div className={styles.priceInfo}>
          <span className={styles.label}>Preço</span>
          <span className={styles.price}>R$ {price.toFixed(2)}</span>
        </div>
        <Button
          onClick={onCartClick}
          className={styles.cartButton}
        >
          COMPRAR
        </Button>
      </div>
    </div>
  );
}
