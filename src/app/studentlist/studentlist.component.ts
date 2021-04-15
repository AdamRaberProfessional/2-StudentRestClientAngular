import { Component, OnInit } from '@angular/core';
import {Student} from '../models/Student';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  studentList: Student[] = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.updateStudentList();
  }
  
  async updateStudentList(){
    const url: string = 'http://localhost:8080/getstudent?id=all';
    const data = await fetch(url);
    const parsedData = await data.json();
    for(let key in parsedData){
      const currentStudent = parsedData[key];
      let tmpStudent: Student;
      if(currentStudent !== null){
        tmpStudent = {
          id: key,
          firstname: currentStudent.firstname,
          lastname: currentStudent.lastname,
          grade: currentStudent.grade,
          major: currentStudent.major,
          timecreated: currentStudent.timecreated
        }
        this.studentList.push(tmpStudent);
      }
    }
    for(let stuIndex in this.studentList){
      console.log(this.studentList[stuIndex]);
    }
  }
}
