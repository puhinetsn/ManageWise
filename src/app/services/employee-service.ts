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

  getEmployees(
    sortBy?: 'name' | 'date' | 'skills',
    sortOrder?: 'asc' | 'desc',
    searchTerm?: string
  ): Employee[] {
    let employeesCopy = [...this.employees()];

    if (searchTerm && searchTerm.trim().length >= 2) {
      const term = searchTerm.trim().toLowerCase();
      employeesCopy = employeesCopy.filter(
        (e) =>
          e.fullName.toLowerCase().includes(term) ||
          e.email.toLowerCase().includes(term)
      );
    }

    if (!sortBy || !sortOrder) {
      return employeesCopy;
    }

    return employeesCopy.sort((a, b) => {
      let valueA: string | number | Date;
      let valueB: string | number | Date;

      switch (sortBy) {
        case 'name':
          valueA = a.fullName.toLowerCase();
          valueB = b.fullName.toLowerCase();
          break;
        case 'date':
          valueA = new Date(a.startDate);
          valueB = new Date(b.startDate);
          break;
        case 'skills':
          valueA = a.skills?.length || 0;
          valueB = b.skills?.length || 0;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
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
