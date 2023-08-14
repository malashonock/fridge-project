import { MatPaginatorIntl } from '@angular/material/paginator';

export const matPaginatorIntl = new MatPaginatorIntl();

// https://github.com/angular/components/blob/main/src/material/paginator/paginator-intl.ts
matPaginatorIntl.firstPageLabel = $localize`:@@paginatorFirstPage:First page`;
matPaginatorIntl.lastPageLabel = $localize`:@@paginatorLastPage:Last page`;
matPaginatorIntl.previousPageLabel = $localize`:@@paginatorPrevPage:Previous page`;
matPaginatorIntl.nextPageLabel = $localize`:@@paginatorNextPage:Next page`;
matPaginatorIntl.itemsPerPageLabel = $localize`:@@paginatorItemsPerPage:Items per page:`;

matPaginatorIntl.getRangeLabel = (
  page: number,
  pageSize: number,
  length: number
): string => {
  const of = $localize`:@@paginatorOfItems:of`;

  if (length == 0 || pageSize == 0) {
    return `0 ${of} ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} – ${endIndex} ${of} ${length}`;
};
