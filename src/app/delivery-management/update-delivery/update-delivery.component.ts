import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { IDelivery } from 'src/app/model/delivery.model';
import { DeliveryService } from 'src/app/service/delivery.service';


@Component({
  selector: 'update-delivery',
  template:  `
            <div *ngIf="errorMessage" class="alert alert-danger">
                  {{errorMessage?.error?.details | json}}
            </div>

            <div *ngIf="delivery" class="col-md-6">
              <form [formGroup]="updateForm" autocomplete="off" novalidate (ngSubmit)="updateDelivery(updateForm.value)">
            <div class="form-group" >
              <label for="deliveryId">Delivery Id:</label>
              
              <input  id="deliveryId" type="text" required class="form-control" formControlName="deliveryId"  [ngModel]=delivery?.deliveryId readonly />
            </div>
            <div>
              <label for="DeliveryName">Owner Name:</label>
              <em *ngIf="updateForm.controls.ownerName?.invalid && (updateForm.controls.ownerName?.touched)">Required</em>
              <input  id="ownerName" type="text" required class="form-control" formControlName="ownerName"  [ngModel]=delivery?.ownerName readonly />
            </div>
              <div class="form-group" >
            <em *ngIf="updateForm.controls.date?.invalid && (updateForm.controls.date?.touched)">Required</em>
            <label for="DeliveryDate">Delivery Date:</label>
              <input id="DeliveryeDate" required type="date" class="form-control" formControlName="date" [ngModel]=delivery?.date placeholder="format (mm/dd/yyyy)..." />
            </div>
            <div class="form-group" >
              <label for="DeliveryTime">Delivery Time:</label>
              <em *ngIf="updateForm.controls.time1?.invalid && (updateForm.controls.time1?.touched)">Required</em>
              <input  id="DeliveryTime"  required type="text" class="form-control" formControlName="time1" [ngModel]=delivery?.time1 placeholder="start and end time..." />
            </div>
            <div class="form-group" >
            <label for="DeliveryStatus">Delivery Status:</label>
            <em *ngIf="updateForm.controls.status1?.invalid && (updateForm.controls.status1?.touched)">Required</em>
            <input  id="DeliveryStatus"  required type="text" class="form-control" formControlName="status1" [ngModel]=delivery?.status1 placeholder="Delivery Status..." />
            </div>
            <button type="submit"  [disabled]=updateForm.invalid class="btn btn-primary">Update</button>
            <button type="button"   class="btn btn-primary" (click)="cancel()">Cancel</button>
            </form>
            </div>`
              ,
              
  styles: ['em{float:right; color: #E05c65; padding-left-10px;}']

})
export class UpdateDeliveryComponent implements OnInit {
  did : number;
  delivery : IDelivery;
  updateForm : FormGroup;
  private errorMessage;


  constructor(private router: Router, private deliveryService: DeliveryService,private activatedRoute:ActivatedRoute) {
  }
  ngOnInit(): void {

    

    this.updateForm = new FormGroup
    ({
      deliveryId  : new FormControl(),
      ownerName   : new FormControl(),
      time1       : new FormControl(),
      date        : new FormControl(),
      status1     : new FormControl()

    });


    this.deliveryService.getDeliveryById(+this.activatedRoute.snapshot.params['did']).subscribe(delivery => {this.delivery=delivery},
                                                                                              (error) => {this.errorMessage = error},
  );
    // let deliveryId : number = this.activatedRoute.params['did']
    // console.log(deliveryId);
    // this.deliveryService.deleteDelivery(deliveryId).subscribe(data=> console.log(data));
    // this.router.navigate(['/deliveries']);
  }
  updateDelivery(delivery) {
    this.deliveryService.updateDelivery(delivery).subscribe(delivery => this.delivery= delivery);
    this.router.navigate(['./delivery-management/deliveries']);
  }

}