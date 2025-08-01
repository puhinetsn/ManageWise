import { Injectable, signal } from '@angular/core';
import { Employee, EmployeeFields } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees = signal<Employee[]>([]);
  initialId: number = 1;

  constructor() {
    this.loadFromLocalStorage();
  }

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

  loadFromLocalStorage() {
    const employeeList = localStorage.getItem('employees');
    if (employeeList) {
      const employeesParsed = JSON.parse(employeeList);
      this.employees.set(employeesParsed);

      const maxId = employeesParsed.reduce(
        (max: number, emp: Employee) => Math.max(max, emp.id),
        0
      );
      this.initialId = maxId + 1;
    }
  }

  getEmployees(): Employee[] {
    return this.employees();
  }

  removeEmployee(index: number) {
    this.employees.update((current) =>
      current.filter((employee) => employee.id !== index)
    );
    localStorage.setItem('employees', JSON.stringify(this.employees()));
  }

  editEmployee(info: Employee) {
    console.log(info);
    this.employees.update((current) => {
      console.log('Current:', current);
      return current.map((emp) => {
        console.log('Comparing', emp.id, 'with', info.id);
        return emp.id === info.id ? { ...info } : emp;
      });
    });

    localStorage.setItem('employees', JSON.stringify(this.employees()));
  }
}
