import React, { useState } from 'react';
import styles from './Pagination.module.css';

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  portionSize?: number | 10,
  onPageChanged: (page: number) => void,
};

const Pagination: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  portionSize = 10,
  currentPage,
  onPageChanged,
}: PropsType) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const portionsCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const handlePrevClick = () => {
    setPortionNumber(portionNumber - 1);
  };

  const handleNextClick = () => {
    setPortionNumber(portionNumber + 1);
  };

  return (
    <div className={styles.paginator}>
      {
        portionNumber > 1
          && <button type="button" onClick={handlePrevClick}>{'<'}</button>
      }
      {
        pages
          .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
          .map((page) => (
            <button
              type="button"
              className={`${currentPage + 1 === page ? styles.selectedPage : ''} ${styles.pageNumber}`}
              onClick={() => onPageChanged(page - 1)}
            >
              {page}
            </button>
          ))
      }
      {
        portionsCount > portionNumber
          && <button type="button" onClick={handleNextClick}>{'>'}</button>
      }
    </div>
  );
};

Pagination.defaultProps = {
  portionSize: 10,
};

export default Pagination;
