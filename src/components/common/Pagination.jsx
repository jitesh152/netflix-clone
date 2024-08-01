import React, { useState, useEffect } from 'react';

const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  
    const [displayedPages, setDisplayedPages] = useState([]);

    if( totalPages === 0 || totalPages === '' ) {
        return;
    }

    const calculatePages = () => {
        const pages = [];
        const totalDisplayPages = 5; // Total number of pages to display including ellipses

        if (totalPages <= totalDisplayPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = currentPage - 2;
            let endPage = currentPage + 2;

            if (startPage < 1) {
                startPage = 1;
                endPage = totalDisplayPages;
            } else if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - totalDisplayPages + 1;
            }

            // Add ellipses if necessary
            if (startPage > 1) {
                pages.push(1, '...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages) {
                pages.push('...', totalPages);
            }
        }

        setDisplayedPages(pages);
    };

    useEffect(() => {
        calculatePages();
    }, [totalPages, currentPage]);

    const handleClick = (page) => {
        if (page !== '...') {
            onPageChange(page);
        }
    };

    return (
        <div className='pagination-wrap'>
            <ul className="pagination">
                {displayedPages.map((page, index) => (
                <li
                    key={index}
                    className={`page-item ${page !== '...' ? 'pagenum' : ''} ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handleClick(page)}
                >
                    <span className="page-link">{page}</span>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
