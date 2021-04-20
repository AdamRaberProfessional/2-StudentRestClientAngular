import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-editdb',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css']
})
export class CreateStudentComponent implements OnInit {

  firstnameInput : string = "";
  lastnameInput : string = "";
  majorInput : string = ""
  selectedGrade: any = "0";
  validGrades = [...Array(16).keys()].map(i => i + 1)


  @Output() hidecreate = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  createStudent(){
    let invalidInput = false;
    if(this.selectedGrade != "0" && this.firstnameInput !== "" && this.lastnameInput !== ""){
      const firstName = this.firstnameInput.charAt(0).toUpperCase() + this.firstnameInput.slice(1);
      const lastName = this.lastnameInput.charAt(0).toUpperCase() + this.lastnameInput.slice(1);
      if(this.selectedGrade <= 12){
        $.post("http://localhost:8080/createstudent",
              {
                fname: firstName,
                lname: lastName,
                grade: this.selectedGrade
              })
      }else{
        if(this.majorInput !== ""){
          $.post("http://localhost:8080/createstudent",
          {
            fname: firstName,
            lname: lastName,
            grade: this.selectedGrade,
            major: this.majorInput.toUpperCase()
          })
        }else{
          alert("Major cannot be blank");
          invalidInput = true;
        }
      }
    }else{
      invalidInput = true;
      alert("No inputs can be left blank");
    }
    if(!invalidInput){
    this.hidecreate.emit();
    }
    
  }
}
