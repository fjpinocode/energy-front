export class Page {
    // The number of elements in the page
    limit = 0;
    // The total number of elements
    count = 0;
    // The current index page number
    offset = 0;

    // Field to sort
    sort = '_id';
    // Direction of sort
    dir: 'asc' | 'desc' = 'desc';

    constructor(c: { limit?: number, count?: number, offset?: number, sort?: string, dir?: 'asc' | 'desc'}) {
        this.limit = Number(c.limit) || 10;
        this.count = Number(c.count) || 0;
        this.offset = Number(c.offset) || 0;
        this.sort = c.sort || '_id';
        this.dir = c.dir || 'asc';
    }

    sortDefault() {
        this.sort = '_id';
        this.dir = 'desc';
    }

    // The total number of pages
    get pageSize(): number {
        let res = 0;
        try {
            if (this.count > 0 && this.limit > 0) {
                res = Math.ceil(this.count / this.limit);
            }
        } catch (error) {
            console.log(error);
        }
        return res;
    }

    get from(): number {
        return Number(this.offset) * Number(this.limit);
    }
}
