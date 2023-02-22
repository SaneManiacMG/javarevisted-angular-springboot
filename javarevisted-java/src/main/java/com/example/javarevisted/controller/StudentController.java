package com.example.javarevisted.controller;

import com.example.javarevisted.model.Student;
import com.example.javarevisted.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class StudentController {
    @Autowired
    StudentRepository studentRepository;

    @GetMapping("/ping")
    public String healthCheck() {
        return "This is working well";
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping("/student")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/findStudent")
    public Student findStudent(@RequestParam("studentId") int studentId) {
        System.out.println(studentId);
        return studentRepository.findById(studentId);
    }

    @PostMapping("/updateStudent")
    public Student updateStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/deleteStudent")
    public String deleteStudent(@RequestParam("studentId") int studentId) {
        studentRepository.deleteById(studentId);
        return "Student " + studentId + " has been deleted";
    }
}
