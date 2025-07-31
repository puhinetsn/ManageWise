import { Injectable, signal } from '@angular/core';
import { Employee, EmployeeFields } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees = signal<Employee[]>([]);
  initialId: number = 1;

  createEmployee(info: EmployeeFields) {
    this.employees.update((current) => [
      ...current,
      {
        ...info,
        id: this.initialId,
      },
    ]);
    localStorage.setItem('employees', JSON.stringify(this.employees()));
    this.initialId += 1;
  }
}
