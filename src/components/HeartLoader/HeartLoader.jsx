
import styles from './HeartLoader.module.css';

const HeartLoader = ({ size = 'normal', opacity = 1, className = '' }) => {
  const containerClass = size === 'large' ? styles.containerLarge : styles.container;

  return (
    <div className={`${styles.container} ${className} ${containerClass}`} style={{ opacity }}>
      <div className={styles.preloader}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.shadow} />
    </div>
  );
};

export default HeartLoader;
