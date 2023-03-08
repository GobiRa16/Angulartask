import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm ! : FormGroup;
  constructor (
     private formbuilder: FormBuilder,
     private http : HttpClient,
     private router : Router
    ){ }
  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      mobile:['',Validators.required]
    })
}
signUp(){
  this.http.post<any>("http://localhost:3000/signupUser",this.signupForm.value)
  .subscribe(res=>{
    alert("Signup Successfull!")
    this.signupForm.reset();
    this.router.navigate(['login']);
  },
  err=>{
    alert("Something Wennt Wrong")
  })
}
}

