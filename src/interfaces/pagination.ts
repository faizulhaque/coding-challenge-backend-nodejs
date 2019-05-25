export interface IPagination {
    limit: number;
    offset: number;
    sortBy: string;
    sortOrder: string;
    totalCount?: number;
  }
