package com.example.spring_miniproject.Service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_miniproject.Entity.Employee;
import com.example.spring_miniproject.Repo.EmployeeRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
	
	@Autowired
	private EmployeeRepo emprepo;
	
	public Employee PostEmployee(Employee emp) {
		return emprepo.save(emp);	
	}
	
	public List<Employee> ShowEmployee() {
		return emprepo.findAll();
	}
	
	public void DeletEmployee(Long id) {
		if(!emprepo.existsById(id)) {
			throw new EntityNotFoundException("The Entity with this details does not Exists");
		}
		 emprepo.deleteById(id);
	}
	
	public Employee getEmployee(Long id){
	  return emprepo.findById(id).orElse(null);
	}
	
	public Employee UpdateEmployee(Long id,Employee emp)
	{	Optional<Employee> optionalemp = emprepo.findById(id);
		if(optionalemp.isPresent())
		{
			Employee existingemp = optionalemp.get();
			
			existingemp.setDepartment(emp.getDepartment());
			existingemp.setEmail(emp.getEmail());
			existingemp.setName(emp.getName());
			existingemp.setPhone(emp.getPhone());
			return emprepo.save(existingemp);
		}
		return null;
	}
	}

