import { Component, inject, input, OnInit, signal } from '@angular/core';
import { EmployeeCard } from './employee-card/employee-card';
import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../models/employee.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [EmployeeCard, DatePipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList implements OnInit {
  showSkills = input<boolean>();
  customInfo = input<boolean>();
  customActions = input<boolean>();
  employeeService = inject(EmployeeService);
  employees = signal<Employee[]>([]);
  ngOnInit() {
    this.employees.set(this.employeeService.getEmployees());
    console.log(this.employees());
  }
}
