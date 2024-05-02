export interface Pagination<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    pageSize: number;
    lastPage: number;
    page: number;
}
