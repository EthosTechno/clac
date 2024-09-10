export class ComplimentModel {
    constructor() {
        this.limit = 10;
        this.page = 1;
        this.search = "";
        this.sortDirection = "";
        this.sortyBy = "";
    }

    limit: number;
    page: number;
    search: String;
    sortDirection: String;
    sortyBy: String;
}