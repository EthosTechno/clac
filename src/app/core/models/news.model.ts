export class NewsModel {
    constructor() {
        this.title = '';
        this.link = '';
        this.articleText = '';
        this.coverPhoto = '';

        this.limit = 10;
        this.page = 1;
        this.search = "";
        this.sortDirection = "";
        this.sortyBy = "";

    }

    title: string;
    link: string;
    articleText: string;
    coverPhoto: string;
    image: string | ArrayBuffer;
    

    limit: number;
    page: number;
    search: String;
    sortDirection: String;
    sortyBy: String;
}