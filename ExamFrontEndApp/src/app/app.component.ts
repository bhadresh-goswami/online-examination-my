import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { questionModel } from './models/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ExamFrontEndApp';
  questionModelObj : questionModel[] = [];
  question!:questionModel;
  isSubmitted = false;
  attempt = 0;
  trueAns = 0;
  wrongAns = 0;
  notAttempt=0;

constructor(private http:HttpClient) {
  
  
}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //http://online-examination-my.somee.com/api/QuestionServices
    //https://localhost:7291/api/QuestionServices
    this.http.get("http://online-examination-my.somee.com/api/QuestionServices").subscribe(res=>{
      //console.log(res);  
      let questions = res as [];    
      
      questions.forEach(element => {
        console.log(element);
        this.question = {
          Id : element["questionId"] as number,
          correctA : element["answer"] as string,
          optionA :element["aOption"] as string,
          optionB :element["bOption"] as string,
          optionC :element["cOption"] as string,
          optionD :element["dOption"] as string,
          questionTitle : element["question"] as string,
          selectedAns:"",
          score:0,
          attempt:false
        };
        

        this.questionModelObj.push(this.question);
      });

      this.shuffleArray(this.questionModelObj);

      console.log(this.questionModelObj);
      
    });
  }


   shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Shuffle the questions array
  resetObject(obj:questionModel, i:number){
    //console.log(`Object before Changed:${JSON.stringify (this.questionModelObj[i])}`);
    //this.questionModelObj[i]=obj;
    //console.log(`Object after Changed:${JSON.stringify (this.questionModelObj[i])}`);
    
  }

  onSubmit(){
    this.isSubmitted=!this.isSubmitted;
    console.log(JSON.stringify (this.questionModelObj));    
    this.questionModelObj.forEach(q=>{
      if(q.attempt){
        this.attempt++;
        if(q.selectedAns==q.correctA){
          this.trueAns++;
        }
        else{
          this.wrongAns++;
        }
      }
      else{
        this.notAttempt++;
      }
    });
  }

}
