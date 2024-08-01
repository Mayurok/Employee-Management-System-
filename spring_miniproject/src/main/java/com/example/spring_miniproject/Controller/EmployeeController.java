package com.example.spring_miniproject.Controller;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

import com.example.spring_miniproject.Entity.Employee;
import com.example.spring_miniproject.Repo.EmployeeRepo;
import com.example.spring_miniproject.Service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {
    
	@Autowired
	private EmployeeService empserv;
	
	@PostMapping("/addemployee")
	public Employee PostEmployee(@RequestBody Employee employee)
	{
		return  empserv.PostEmployee(employee);
	}
	
	@GetMapping("/employees")
	public List<Employee> ShowEmployee()
	{
		return empserv.ShowEmployee();
	}
	
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
		try {
			empserv.DeletEmployee(id);
			return new ResponseEntity<>("Entity Deleted Successfully",HttpStatus.OK);
		}
		catch(EntityNotFoundException e)
		{
			return new ResponseEntity<>("Entity with this details not found", HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/employee/{id}")
	public ResponseEntity<?> getEmployeeByid(@PathVariable Long id){
		Employee emp = empserv.getEmployee(id);
		if(emp== null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(emp);
	}
	
	@PatchMapping("/employee/{id}")
	public ResponseEntity<?> UpdateEmployee(@PathVariable Long id,@RequestBody Employee emp){
		Employee updatedemp = empserv.UpdateEmployee(id, emp);
		if(updatedemp == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.ok(updatedemp);
	}
	}

