export interface questionModel{           
    Id:number;
    questionTitle:string;
    optionA:string,optionB:string,optionC:string,optionD:string,
    correctA:string,
    selectedAns:string,
    score:number,
    attempt:boolean
}