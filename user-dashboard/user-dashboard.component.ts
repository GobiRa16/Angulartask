import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserModel } from './user-dashboard.model';
import { ApiService } from '../shared/api.service';
import { HttpErrorResponse} from '@angular/common/http'
import { formatPercent } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers:[ApiService , FormBuilder]
})
export class UserDashboardComponent implements OnInit {

  formValue !:FormGroup;
  userModelObj : UserModel = new UserModel();
  userData : any;
  
  constructor(
    private formbuilder : FormBuilder,
    private api : ApiService){}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : ['']
    })
    this.getAllUser();
  }
 
  postUserDetails(){
    this.userModelObj.firstname = this.formValue.value.firstname;
    this.userModelObj.lastname = this.formValue.value.lastname;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;

    this.api.postUser(this.userModelObj)
    .subscribe(
      res=>{
        console.log(res);
        alert("User Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      },
      err=>{
        alert("Something Went Wrong")
      }
    )
  }
  getAllUser(){
    this.api.getUser()
    .subscribe(
      res=>{
        this.userData = res;
      }
    )
  }
  deleteUser(row: any ){
    this.api.deleteUser(row.id)
    .subscribe(
      res=>{
        alert("User Deleted");
        this.getAllUser();
      }
    )
  }
  onEdit(row : any){
    this.userModelObj.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
  }
  updateUserDetails(){
    this.userModelObj.firstname = this.formValue.value.firstname;
    this.userModelObj.lastname = this.formValue.value.lastname;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;

    this.api.updateUser(this.userModelObj,this.userModelObj.id)
    .subscribe(
      res=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      }
    )
  }
}
