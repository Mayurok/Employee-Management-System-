package com.example.spring_miniproject.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee")
@NoArgsConstructor
@AllArgsConstructor

@Data

public class Employee {
	
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;

private String name;

private String email;

private String phone;

private String department;




}
