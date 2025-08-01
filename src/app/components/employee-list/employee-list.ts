import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
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
export class EmployeeList implements OnInit, OnChanges {
  showSkills = input<boolean>();
  customInfo = input<boolean>();
  customActions = input<boolean>();
  sortOrder = input<'asc' | 'desc'>();
  sortBy = input<'name' | 'date' | 'skills'>();
  employeeService = inject(EmployeeService);
  employees = signal<Employee[]>([]);
  ngOnInit() {
    this.employees.set(
      this.employeeService.getEmployees(this.sortBy(), this.sortOrder())
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sortBy'] || changes['sortOrder']) {
      this.employees.set(
        this.employeeService.getEmployees(this.sortBy(), this.sortOrder())
      );
    }
  }
}
