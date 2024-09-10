import { Component,Output,EventEmitter, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import  { NgForm } from "@angular/forms"
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  stripe :  any;
  loading : boolean = false;
  confirmation : any;
  card: any;
  //cardHandler = this.onChange.bind(this);
  error: string;
  stripeToken: any;
  @Output() next_id = new EventEmitter();
  next: any;

  constructor(private stripeService:AngularStripeService,private cd: ChangeDetectorRef) { }
  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51I44QjGgga2GK8PR1QFsEOggpWTjpv7U0GW7oolfkoOsIJ9Xw5NP9nwQfNAGNZermOJzQBBQcd4rhxozWzQS9BMJ00NYDbu3M4').then(
      stripe=> {
        this.stripe = stripe;
    const elements = stripe.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    //this.card.addEventListener('change', this.cardHandler);
    });
  }

  ngOnDestroy() {
    //this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  valueChange(){
    this.next_id.emit();
  }
  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);  
    if (token) {    
      this.stripeToken = token.id    
      console.log('Success=====================!', token);
      this.valueChange();
    } else {        
      this.error = error.message
      this.cd.detectChanges();
      console.log('Error:', error);
    }
  }
  ngOnInit(): void {
  }

}
