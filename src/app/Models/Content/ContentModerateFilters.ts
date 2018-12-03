const PAGE = 'page';
const PAGE_SIZE = 'pageSize';
const SEARCH = 'search';
const INCLUDE_ONLY_ACTIVE = 'includeOnlyActive';
const FROM = 'from';
const TO = 'to';
const TYPE_IDS = 'typeIds';

export class ContentModerateFilters {
    page: number;
    pageSize: number;
    includeAll = false;
    typeIds?: number[] = [];
    search?: string;
    from?: Date;
    to?: Date;

    getUrl(): string {
        let url = `?${PAGE}=${this.page + 1}`
            + `&${PAGE_SIZE}=${this.pageSize}`
            + `&${INCLUDE_ONLY_ACTIVE}=${this.includeAll}`;
        if (this.search) {
            url += `&${SEARCH}=${this.search}`;
        }
        if (this.from) {
            url += `&${FROM}=${this.from}`;
        }
        if (this.to) {
            url += `&${TO}=${this.to}`;
        }
        if (this.typeIds && this.typeIds.length > 0) {
            url += `&${TYPE_IDS}=${ this.typeIds.join('&' + TYPE_IDS + '=')}`;
        }
        return url;
    }
}
