
export class DocumentModel {
    type:string;
    limit  : string = '5';
    page   : string = "1";
    search : string= "";
    sortDirection : string= "";
    sortyBy :string= "";
    itemsPerPage: number = 5;
    currentPage: number = 1;
    totalItems:number =1;
    id:string = "Reporting";
}