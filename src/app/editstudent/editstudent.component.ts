import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../models/Student';
import * as $ from 'jquery';


@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {

  @Input() chosenStudent : Student | undefined;
  @Output() hideEdit = new EventEmitter<void>();

  
  attributeVal : string = "";
  firstname: string = "";
  lastname: string = "";
  grade: string = "";
  major: string = "";
  selectedAttribute: string = "";
  selectedGrade: string = "";
  majorChangedTo: string = "";
  changingMajorForGrade: boolean = false;
  options = ["First Name", "Last Name", "Grade", "Major"];
  validGrades = [...Array(16).keys()].map(i => i + 1);
  constructor() { }

  ngOnInit(): void {
  }

  async btnClick(){
    /*  */
    let validEdit = true;
    let attributeChange = this.selectedAttribute.replace(" ", "").toLowerCase();
    let attributeValue;
  
    attributeValue = this.attributeVal;

    if(attributeValue === "" || attributeChange === ""){
      validEdit = false;
    }

    if(attributeChange == "major"){
      
      if(attributeValue.length >4){
        validEdit = false;
      }else{
        attributeValue = attributeValue.toUpperCase();
      }
    }else if(attributeChange === "firstname" || attributeChange === "lastname"){
      attributeValue = attributeValue.charAt(0).toUpperCase() + attributeValue.slice(1); // capitalize first letter 
    }else if(attributeChange == "grade"){
      if(this.changingMajorForGrade === true && this.majorChangedTo === ""){
        validEdit = false;
      }
    }
    let params = {
      id: this.chosenStudent!.id,
      attributeChange: attributeChange,
      attributeVal: attributeValue
    }
    if(validEdit){
      await $.post("http://localhost:8080/editstudent", params);
      if(this.changingMajorForGrade === true){
        let validMajorChange = true;
        let newMajor;
        if(this.majorChangedTo !== ""){
          newMajor = this.majorChangedTo;
        }else{
          validMajorChange = false;
        }
        if(validMajorChange){
          let newParams = params;
          newParams.attributeChange = "major";
          newParams.attributeVal = this.majorChangedTo.toUpperCase();
          $.post("http://localhost:8080/editstudent", newParams);
        }
      }
      this.hideEdit.emit();
    }else{
      alert("Non-valid edit. Please make sure major is less than 4 characters and fields are not blank.")
    }   
  }

  changeMajor(): boolean {
    /* checks if the grade change means that a new major needs to be shown, and returns the corresponding boolean. */
    if(this.selectedAttribute === 'Grade'){
      const oldGrade = this.chosenStudent!.grade!
      const newGrade = this.attributeVal!;
      if(parseInt(oldGrade) <12 &&  parseInt(newGrade)>11){
        this.changingMajorForGrade = true;
        return true;
      }else{
        this.changingMajorForGrade = false;
      }
    }else{
      this.changingMajorForGrade = false;
    }
    
    return false;
    
  }

 

}
