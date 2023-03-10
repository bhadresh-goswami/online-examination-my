import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { questionModel } from 'src/app/models/question';


@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.css']
})
export class ExamQuestionsComponent implements OnInit {

  /**
   *
   */
  @Input() questionObj!:questionModel;
  selected:string = "";
  @Output() score=0;
  @Output() attempt=0;
  @Output() wrongeAns = 0;
  @Input() isSubmitted=false;
  @Output() notattempt = 0;

  @Output() getModelObj = new EventEmitter<questionModel>();



  constructor(private http:HttpClient) {
    

    
  }

ngOnInit(): void {
 // this.get();
}
selectedOption(ans:string){
  //
  this.selected==ans;
  this.questionObj.selectedAns = ans;
  this.questionObj.score = this.questionObj.selectedAns==this.questionObj.correctA?1:0;  
  console.log(this.questionObj);
  this.CheckAns();
}

CheckAns(){
  
  if(this.questionObj.correctA == this.selected){
    this.score++;
    this.attempt++;
    this.questionObj.attempt = true;
  }
  else  if(this.questionObj.selectedAns==""){
    this.notattempt ++;
  }
  else{
    this.wrongeAns++;
    this.attempt++;
    
    this.questionObj.attempt = true;
  }

  this.getModelObj.emit(this.questionObj);

}
onAddBook() {
  
}
}
