'use client';

import {
  Children,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Masonry.module.css';
import { useMediaQuery } from '@/_hooks/useMediaQuery';

function MasonryItem({
  children,
  maxWidth,
  transform,
  onSizeUpdate,
}: {
  children?: React.ReactNode;
  maxWidth: string;
  transform?: string;
  onSizeUpdate?: (width: number, height: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  const [show, setShow] = useState(false);
  const handleResize = useCallback(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      onSizeUpdate?.(offsetWidth, offsetHeight);
      setShow(offsetWidth > 0 || offsetHeight > 0);
    }
  }, [onSizeUpdate]);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(handleResize);
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [handleResize]);

  return (
    <li
      ref={ref}
      className={`${styles.item} ${show ? styles.show : ''}`}
      style={{ maxWidth, transform }}
    >
      {children}
    </li>
  );
}

const MemoizedMasonryItem = memo(MasonryItem);

export default function Masonry({ children }: { children: React.ReactNode }) {
  const items = useMemo(() => Children.toArray(children), [children]);

  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  const [columns, gap] = useMemo(() => {
    if (isDesktop) {
      return [4, 40];
    }

    if (isTablet) {
      return [2, 40];
    }

    return [1, 24];
  }, [isDesktop, isTablet]);

  const maxItemWidth = useMemo(() => {
    if (columns === 1) {
      return '100%';
    }

    const maxWidth = `${100 / columns}%`;
    if (gap === 0) {
      return maxWidth;
    }

    return `calc(${maxWidth} - ${(gap * (columns - 1)) / columns}px)`;
  }, [columns, gap]);

  const [itemsSizes, setItemsSizes] = useState(() =>
    Array.from({ length: items.length }, () => ({ width: 0, height: 0 })),
  );
  const largestItemWidth = useMemo(
    () =>
      itemsSizes.reduce(
        (largestWidth, { width }) =>
          width > largestWidth ? width : largestWidth,
        0,
      ),
    [itemsSizes],
  );

  const handleItemResize = useCallback(
    (index: number, width: number, height: number) => {
      setItemsSizes((prevItemsSizes) => {
        const prevItemSize = prevItemsSizes.at(index);
        if (
          !prevItemSize ||
          (prevItemSize.width === width && prevItemSize.height === height)
        ) {
          return prevItemsSizes;
        }

        const nextItemsSizes = [...prevItemsSizes];
        nextItemsSizes.splice(index, 1, { width, height });
        return nextItemsSizes;
      });
    },
    [],
  );

  const [itemsPositions, masonryHeight] = useMemo(() => {
    const middleLeftColumn = columns / 2 - 1;
    const middleRightColumn = middleLeftColumn + 1; /* if even columns */

    const columnsHeights = Array.from({ length: columns }, () => 0);
    const positions = itemsSizes.map((itemSize) => {
      let shortestColumn = 0;
      columnsHeights.forEach((columnHeight, i) => {
        if (columnHeight < columnsHeights[shortestColumn]) {
          shortestColumn = i;
        }
      });

      let yOffset = columnsHeights[shortestColumn];
      if (yOffset === 0) {
        columnsHeights[shortestColumn] += itemSize.height;
      } else {
        yOffset += gap;
        columnsHeights[shortestColumn] += itemSize.height + gap;
      }

      // offset it from the middle (left: 50%)
      let xOffset = 0;
      if (columns === 1) {
        xOffset = (largestItemWidth / 2) * -1;
      } else if (shortestColumn === middleLeftColumn) {
        xOffset = (largestItemWidth + gap / 2) * -1;
      } else if (shortestColumn === middleRightColumn) {
        xOffset = gap / 2;
      } else if (shortestColumn < middleLeftColumn) {
        const columnsAfter = middleLeftColumn - shortestColumn;
        xOffset =
          (largestItemWidth +
            largestItemWidth * columnsAfter +
            gap / 2 +
            gap * columnsAfter) *
          -1;
      } else {
        const columnsBefore = shortestColumn - middleRightColumn;
        xOffset =
          largestItemWidth * columnsBefore + gap / 2 + gap * columnsBefore;
      }

      return `translate(${xOffset}px, ${yOffset}px)`;
    });

    return [positions, Math.max(...columnsHeights)];
  }, [columns, gap, itemsSizes, largestItemWidth]);

  return (
    <ul className={styles.masonry} style={{ height: `${masonryHeight}px` }}>
      {useMemo(
        () =>
          items.map((item, i) => (
            <MemoizedMasonryItem
              key={
                typeof item === 'object' && 'key' in item && item.key !== null
                  ? item.key
                  : i
              }
              maxWidth={maxItemWidth}
              transform={itemsPositions[i]}
              onSizeUpdate={(width, height) =>
                handleItemResize(i, width, height)
              }
            >
              {item}
            </MemoizedMasonryItem>
          )),
        [items, maxItemWidth, handleItemResize, itemsPositions],
      )}
    </ul>
  );
}
