package com.example.spring_miniproject.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.spring_miniproject.Entity.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{
	
}
