import { useState, useMemo, useCallback } from 'react';

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPageState);
    const startIndex = (currentPage - 1) * itemsPerPageState;
    const endIndex = startIndex + itemsPerPageState;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      paginatedData,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages
    };
  }, [data, currentPage, itemsPerPageState]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page);
    }
  }, [paginationData.totalPages]);

  const nextPage = useCallback(() => {
    if (paginationData.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [paginationData.hasNextPage]);

  const prevPage = useCallback(() => {
    if (paginationData.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginationData.hasPrevPage]);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setCurrentPage(paginationData.totalPages);
  }, [paginationData.totalPages]);

  const changeItemsPerPage = useCallback((newItemsPerPage) => {
    setItemsPerPageState(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  }, []);

  const getPaginationNumbers = useCallback(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= paginationData.totalPages; i++) {
      if (i === 1 || i === paginationData.totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }, [paginationData.totalPages, currentPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    itemsPerPage: itemsPerPageState,
    ...paginationData,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    changeItemsPerPage,
    getPaginationNumbers,
    resetPagination,
    setCurrentPage
  };
};
