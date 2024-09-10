import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/core/constants/constant';
import { DocumentModel, ResponseModel } from 'src/app/core/models';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { UserService } from '../../api.services';
import { ContractDocModel } from 'src/app/core/models/contractDoc.modal';
import { BillingDocModel } from 'src/app/core/models/billingDoc.modal';
import { CommunicationDocModel } from 'src/app/core/models/communicationDoc.modal';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss']
})
export class MyDocumentsComponent implements OnInit {

  documentModel: DocumentModel = new DocumentModel();
  contractModel: ContractDocModel = new ContractDocModel();
  billingModel: BillingDocModel = new BillingDocModel();
  communicationModel: CommunicationDocModel = new CommunicationDocModel();

  constant: Constant = new Constant();

  docDetails: any;
  docContractDetails: any;
  docCommunicatioDetails: any;
  docBillingDetails: any;

  constructor(
    private userService: UserService,
    private swalService: SwalService
  ) {


  }

  ngOnInit(): void {
    this.getReportDocument();
    this.getContractDocument();
    this.getCommunicationDocument();
    this.getBillingDocument();
  }

  getReportDocument() {

    let reqData = this.documentModel
    this.documentModel.type = 'Reporting';

    this.userService.getReportDoc(reqData, 'document/list').subscribe((response: ResponseModel) => {
      if (response.success) {

        this.docDetails = response.data.data;
        this.documentModel.totalItems = response.data.totalDocs
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  pageChanged(event) {
    this.documentModel.page = event;
    this.documentModel.currentPage = event;
    this.getReportDocument();
  }

  getContractDocument() {

    let reqData = this.contractModel
    this.contractModel.type = 'Contract';

    this.userService.getReportDoc(reqData, 'document/list').subscribe((response: ResponseModel) => {
      if (response.success) {
        this.docContractDetails = response.data.data;
        console.log("this.docContractDetails", this.docContractDetails)
        this.contractModel.totalItems = response.data.totalDocs
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  pageChangedContract(event) {
    this.contractModel.page = event;
    this.contractModel.currentPage = event;
    this.getContractDocument();
  }

  getCommunicationDocument() {

    let reqData = this.communicationModel
    this.communicationModel.type = 'Communication';

    this.userService.getReportDoc(reqData, 'document/list').subscribe((response: ResponseModel) => {
      if (response.success) {
        this.docCommunicatioDetails = response.data.data;
        this.communicationModel.totalItems = response.data.totalDocs
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  pageChangedCommunication(event) {
    this.communicationModel.page = event;
    this.communicationModel.currentPage = event;
    this.getCommunicationDocument();
  }

  getBillingDocument() {

    let reqData = this.billingModel
    this.billingModel.type = 'Billing';

    this.userService.getReportDoc(reqData, 'document/list').subscribe((response: ResponseModel) => {
      if (response.success) {
        this.docBillingDetails = response.data.data;
        this.billingModel.totalItems = response.data.totalDocs
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  pageChangedBilling(event) {
    this.billingModel.page = event;
    this.billingModel.currentPage = event;
    this.getBillingDocument();
  }

  download(arg) {
    var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
    saveAs(blob, arg);
  }

}
