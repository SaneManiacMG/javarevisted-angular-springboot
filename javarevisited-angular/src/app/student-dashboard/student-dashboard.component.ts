import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  formValue!: FormGroup;

  studentModelOb: StudentModel = new StudentModel();
  studentData!: any;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      grade: ['']
    })
    this.getAllStudents();
  }

  postStudentDetails() {
    console.log(this.formValue.value.name);
    console.log(this.formValue.value.grade);
    this.studentModelOb.name = this.formValue.value.name;
    this.studentModelOb.email = this.formValue.value.email;
    this.studentModelOb.grade = this.formValue.value.grade;

    console.log(this.studentModelOb);

    this.api.postStudentDetails(this.studentModelOb)
    .subscribe(res=>{
      console.log(res);
      alert("Student added successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllStudents();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllStudents() {
    this.api.getStudent()
    .subscribe(res=>{
      this.studentData = res;
    })
  }

  deleteStudent(row: any) {
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Student deleted");
      this.getAllStudents();
    })
  }

  onEdit(row: any) {
    this.studentModelOb.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['grade'].setValue(row.grade);
  }

  updateStudentDetails() {
    this.studentModelOb.name = this.formValue.value.name;
    this.studentModelOb.email = this.formValue.value.email;
    this.studentModelOb.grade = this.formValue.value.grade;

    this.api.updateStudent(this.studentModelOb)
    .subscribe(res=>{
      alert("Student details updated successfully");
      console.log(res);
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllStudents();
    });
  }
}
