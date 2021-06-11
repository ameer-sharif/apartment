import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { GuardSalary } from 'src/app/model/guardsalary.model';
import { GuardService } from 'src/app/service/guard.service';

@Component({
  selector: 'deleteguard',
  template: `<h1> delete </h1> `,
  styles: [`em{float:right; color: #E05c65; padding-left-10px;`]
},

)


export class DeleteGuardSalaryComponent implements OnInit {

guard: GuardSalary
  constructor(private router: Router, private guardService:GuardService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let guarddata: number = +this.activatedRoute.snapshot.params['fid'];
    console.log(guarddata)
    this.guardService.DeleteGuardSalary(guarddata).subscribe(data => this.guard = data);
    console.log("deleted");
    this.router.navigate(['/guard-management/GuardSalary']);
  }
  
}