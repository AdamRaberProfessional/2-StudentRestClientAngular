import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Student} from '../models/Student';
import * as $ from 'jquery';


@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  studentList: Student[] = [];
  dbAction: string = "";
  studentEditing : Student | undefined;

  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.updateStudentList();
  }
  
  async updateStudentList(){
    /* fetches list of all students and displays it in the list. */
    this.dbAction = "";
    this.studentList = [];
    const url: string = 'http://localhost:8080/getstudent?id=all';
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData)
    for(let index in parsedData){
      const currentStudent = parsedData[index];
      let tmpStudent: Student;
      if(currentStudent !== null){
        tmpStudent = {
          id: currentStudent.id,
          firstname: currentStudent.firstname,
          lastname: currentStudent.lastname,
          grade: currentStudent.grade,
          major: currentStudent.major,
          timecreated: currentStudent.timecreated
        }
        this.studentList.push(tmpStudent);
      }
    }
  }

  deleteStudent(student: Student){
    $.post("http://localhost:8080/deletestudent",
    {
      id: student.id
    }).then(() => this.updateStudentList());
    
  }

  updateListTimeout(){
    setTimeout(() => this.updateStudentList(), 500)
  }

  editStudent(student: Student){
    this.dbAction = "edit";
    this.studentEditing = student;
  }
  
}
