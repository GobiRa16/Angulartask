import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000/signupUser';

  constructor(private http : HttpClient) { }

  postUser(data : any){
    return this.http.post<any>("http://localhost:3000/signupUser",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getUser(){
    return this.http.get<any>("http://localhost:3000/signupUser")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateUser(data : any,id:number){
    return this.http.put<any>("http://localhost:3000/signupUser/",data+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteUser(id : number){
    return this.http.delete<any>("http://localhost:3000/signupUser/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
