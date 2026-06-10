import React from 'react';

/**
 * A beautiful, highly customizable, responsive Pagination component.
 * Features smooth transitions, active states, custom sizing, and alignment logic.
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 25, 50],
  showItemsPerPage = true,
  align = 'between' // 'between', 'center', 'start', 'end'
}) => {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems || 0);

  // Generate page numbers logic with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      const isEllipsisStart = pageNumber === 2 && currentPage > 4;
      const isEllipsisEnd = pageNumber === totalPages - 1 && currentPage < totalPages - 3;
      const showPage =
        pageNumber === 1 ||
        pageNumber === totalPages ||
        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

      if (isEllipsisStart) {
        pages.push({ type: 'ellipsis', key: 'ellipsis-start' });
        continue;
      }

      if (isEllipsisEnd) {
        pages.push({ type: 'ellipsis', key: 'ellipsis-end' });
        continue;
      }

      if (showPage) {
        pages.push({ type: 'page', pageNumber, key: pageNumber });
      }
    }

    // Filter contiguous duplicate ellipses if any
    const uniquePages = [];
    let lastType = '';
    for (const page of pages) {
      if (page.type === 'ellipsis') {
        if (lastType !== 'ellipsis') {
          uniquePages.push(page);
        }
      } else {
        uniquePages.push(page);
      }
      lastType = page.type;
    }
    return uniquePages;
  };

  const pages = getPageNumbers();

  const alignmentClass = {
    between: 'justify-content-between align-items-center',
    center: 'justify-content-center align-items-center',
    start: 'justify-content-start align-items-center',
    end: 'justify-content-end align-items-center'
  }[align] || 'justify-content-between align-items-center';

  return (
    <div className={`d-flex ${alignmentClass} mt-4 flex-wrap gap-3 pagination-container`}>
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="d-flex align-items-center show-items-section">
          <label htmlFor="itemsPerPageSelect" className="form-label me-2 mb-0 text-muted small fw-medium">
            Show:
          </label>
          <select
            id="itemsPerPageSelect"
            className="form-select form-select-sm border-secondary-subtle rounded-3 shadow-sm py-1"
            style={{ width: 'auto', minWidth: '70px', cursor: 'pointer' }}
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {totalItems !== undefined && totalItems > 0 && (
            <span className="ms-2 text-muted small fw-medium">
              {startIndex + 1}-{endIndex} of {totalItems}
            </span>
          )}
        </div>
      )}

      <nav aria-label="Page navigation">
        <ul className={`pagination pagination-sm mb-0 rounded-3 shadow-sm ${align === 'center' ? 'justify-content-center' : ''}`}>
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link border-secondary-subtle px-3 py-1.5"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous"
            >
              <i className="bi bi-chevron-left fw-bold"></i>
            </button>
          </li>

          {/* Page Buttons */}
          {pages.map((item) => {
            if (item.type === 'ellipsis') {
              return (
                <li key={item.key} className="page-item disabled">
                  <span className="page-link border-secondary-subtle bg-light">...</span>
                </li>
              );
            }

            return (
              <li
                key={item.key}
                className={`page-item ${currentPage === item.pageNumber ? 'active' : ''}`}
              >
                <button
                  className="page-link border-secondary-subtle px-3 py-1.5 fw-medium"
                  onClick={() => onPageChange(item.pageNumber)}
                >
                  {item.pageNumber}
                </button>
              </li>
            );
          })}

          {/* Next Button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link border-secondary-subtle px-3 py-1.5"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next"
            >
              <i className="bi bi-chevron-right fw-bold"></i>
            </button>
          </li>
        </ul>
      </nav>

      <style>{`
        .pagination-container .pagination {
          overflow: hidden;
        }
        .pagination-container .page-link {
          transition: all 0.2s ease-in-out;
          color: var(--bs-primary, #0d6efd);
        }
        .pagination-container .page-item:not(.active):not(.disabled) .page-link:hover {
          background-color: var(--bs-primary-bg-subtle, #e9ecef);
          color: var(--bs-primary-text-emphasis, #0a58ca);
          transform: translateY(-1px);
        }
        .pagination-container .page-item.active .page-link {
          background-color: var(--bs-primary, #0d6efd) !important;
          border-color: var(--bs-primary, #0d6efd) !important;
          box-shadow: 0 4px 6px rgba(13, 110, 253, 0.25);
        }
        .pagination-container select:focus {
          border-color: var(--bs-primary, #0d6efd);
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Pagination;
