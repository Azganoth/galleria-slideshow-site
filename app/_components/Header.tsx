import styles from './Header.module.css';
import Link from 'next/link';
import Logo from '@/_assets/logo.svg';

export default function Header({ action }: { action: 'start' | 'stop' }) {
  const canStop = action === 'stop';

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <a className={styles.slidershow} href={canStop ? '/' : '/starry-night'}>
        {canStop ? 'Stop' : 'Start'} slideshow
      </a>
    </header>
  );
}
