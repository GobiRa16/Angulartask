import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  constructor( 
    private formbuilder: FormBuilder,
    private http : HttpClient,
    private router : Router
    ){

  }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUser")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email ===this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['userdashboard'])
      }else{
        alert("User not found")
      }
    },
    err=>{
      alert("Something went wrong!")
    })
  }

}
