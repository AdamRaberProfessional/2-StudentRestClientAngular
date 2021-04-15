import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-editdb',
  templateUrl: './editdb.component.html',
  styleUrls: ['./editdb.component.css']
})
export class EditdbComponent implements OnInit {

  firstnameInput : string = "";
  lastnameInput : string = "";
  majorInput : string = ""
  selectedGrade: any = "0";
  validGrades = [...Array(16).keys()].map(i => i + 1)


  @Output() hide = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  createStudent(){
    alert(this.selectedGrade + this.firstnameInput + this.lastnameInput + this.majorInput)
    if(this.selectedGrade != "0" && this.firstnameInput !== "" && this.lastnameInput !== ""){
      if(this.selectedGrade <= 12){
        $.post("http://localhost:8080/createstudent",
              {
                fname: this.firstnameInput,
                lname: this.lastnameInput,
                grade: this.selectedGrade
              })
      }else{
        if(this.majorInput !== ""){
          $.post("http://localhost:8080/createstudent",
          {
            fname: this.firstnameInput,
            lname: this.lastnameInput,
            grade: this.selectedGrade,
            major: this.majorInput
          })
        }else{
          alert("Major cannot be blank")
        }
      }
    }else{
      alert("No inputs can be left blank")
    }
    this.selectedGrade = "0";
    this.firstnameInput = "";
    this.lastnameInput = "";
    this.hide.emit();
  }

  changeDbAction(){

  }
}
