export class ContentModerateFilters {
    page: number;
    pageSize: number;
    includeAll = false;
    typeIds?: number[] = [];
    search?: string;
    from?: Date;
    to?: Date;
}
