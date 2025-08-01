import { Component, inject, input, TemplateRef } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Employee, EmployeeFields } from '../../../models/employee.model';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { EmployeeService } from '../../../services/employee-service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeForm } from '../../employee-form/employee-form';
@Component({
  selector: 'app-employee-card',
  imports: [MatChipsModule, DatePipe, MatIconModule, NgTemplateOutlet],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
})
export class EmployeeCard {
  showSkills = input<boolean>();
  customInfo = input<boolean>();
  customActions = input<boolean>();
  employee = input.required<Employee>();
  infoTemplate = input<TemplateRef<Employee>>();
  actionsTemplate = input<
    TemplateRef<{
      openDialog: () => void;
      removeEmployee: (id: number) => void;
      id: number;
    }>
  >();

  employeeService = inject(EmployeeService);
  readonly dialog = inject(MatDialog);

  removeEmployee(id: number) {
    this.employeeService.removeEmployee(id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmployeeForm, {
      data: this.employee(),
      panelClass: 'main-dialog',
    });

    dialogRef.afterClosed().subscribe((result: Employee) => {
      if (result) {
        this.employeeService.editEmployee({
          ...result,
          id: this.employee().id,
        });
      }
    });
  }
}
