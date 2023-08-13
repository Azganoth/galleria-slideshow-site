import styles from './MediaControl.module.css';
import Link from 'next/link';
import BackIcon from '@/_assets/icon-back-button.svg';
import NextIcon from '@/_assets/icon-next-button.svg';

export default function MediaControl({
  action,
  href,
}: {
  action: 'previous' | 'next';
  href?: string;
}) {
  const isPrevious = action === 'previous';

  const rootClassName = `${styles.control} ${
    action === 'previous' ? styles.previous : styles.next
  }`;

  const Icon = isPrevious ? BackIcon : NextIcon;
  const controlIcon = <Icon className={styles.icon} />;

  return href ? (
    <Link className={rootClassName} href={href}>
      {controlIcon}
    </Link>
  ) : (
    <span className={rootClassName}>{controlIcon}</span>
  );
}
