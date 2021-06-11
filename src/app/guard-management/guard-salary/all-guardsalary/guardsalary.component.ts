import { Component, OnInit } from '@angular/core';
import { GuardSalary } from 'src/app/model/guardsalary.model';
import { GuardService } from 'src/app/service/guard.service';


@Component({
  selector: 'guardsalary',
  template: `<div >
                <h1>Guard Salary Details</h1>
                <hr/>
                <div  class= "row row-cols-2">
                <div  *ngFor="let guards of guards" class="col-md-4 ">  
                        <allguardsalary #allguards [guarddata] = guards  (customEvent)="parentFunction($event)" ></allguardsalary>
                        <!-- <div>
                        {{allguards.i}}
                        {{allguards.testmyFunction()}}
                        </div> 
                        -->

                  </div>
              </div>`
              

})
export class GuardSalaryComponent {


  //private guardService:GuardService;
  private guards:GuardSalary[];
  //private guardService:GuardService


  constructor(private guardService:GuardService )         //Dependency injection
  {
    //this.guardService=new GuardService;
    this.guardService.getAllGuardSalary().subscribe(guarddata => this.guards = guarddata);
  } 




  parentFunction(event) {
    console.log(event);
  }


}

function ngOnInit() {
  throw new Error('Function not implemented.');
}