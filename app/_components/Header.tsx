import styles from './Header.module.css';
import Logo from '@/_assets/logo.svg';
import normalizeUrl from '../_utils/normalizeUrl';

export default function Header({ action }: { action: 'start' | 'stop' }) {
  const canStop = action === 'stop';

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <a
        className={styles.slidershow}
        href={normalizeUrl(canStop ? '/' : '/starry-night')}
      >
        {canStop ? 'Stop' : 'Start'} slideshow
      </a>
    </header>
  );
}
