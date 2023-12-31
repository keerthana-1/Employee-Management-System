package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepo;

	
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		
		return employeeRepo.findAll();
	}
	
	@PostMapping("/employees")
	public Employee addEmployee(@RequestBody Employee employee){
		
		return employeeRepo.save(employee);
	}
	
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
		
		Employee employee= employeeRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee not found with id"+id));
		return ResponseEntity.ok(employee);
	}
	
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeToUpdate){
		
		Employee employee= employeeRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee not found with id"+id));
		
		employee.setFirstName(employeeToUpdate.getFirstName());
		employee.setLastName(employeeToUpdate.getLastName());
		employee.setEmailId(employeeToUpdate.getEmailId());
		
		Employee updatedEmployee=employeeRepo.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
		
		Employee employee= employeeRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee not found with id"+id));
		
		employeeRepo.delete(employee);
		Map<String,Boolean> response=new HashMap<String,Boolean>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
