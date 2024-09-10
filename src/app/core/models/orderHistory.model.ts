export class OrderHistoryModel {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_no: string;
    country_code: string;
    user_name: string;
    birthdate: string;   
    limit: number;
    page: number;
    search: String;
    sortDirection: String;
    sortyBy: String;

    constructor() {
        this.limit = 10;
        this.page = 1;
    }

}