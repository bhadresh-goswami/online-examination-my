import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  get(){
    this.http.get("https://localhost:7291/api/QuestionServices").subscribe(res=>{
      console.log(res);      
    });
  }
}
