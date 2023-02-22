import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postStudent(data: any) {
    return this.http.post<any>("http://localhost:8080/student", data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  getStudent() {
    return this.http.get<any>("http://localhost:8080/student", data)
    .pipe(map((res: any) => {
      console.log(res)
      return res;
    }))
  }

  updateStudent(data: any) {
    return this.http.post<any>("http://localhost:8080/updatestudent", data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  deleteStudent(id: any) {
    return this.http.delete<any>("http://localhost:8080/deleteStudent", id)
    .pipe(map((res: any) => {
      return res;
    }))
  }
}
