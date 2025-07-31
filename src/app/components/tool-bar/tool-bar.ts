import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeForm } from '../employee-form/employee-form';
import { EmployeeService } from '../../services/employee-service';
import { EmployeeFields } from '../../models/employee.model';

@Component({
  selector: 'app-tool-bar',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
  ],
  templateUrl: './tool-bar.html',
  styleUrl: './tool-bar.scss',
})
export class ToolBar {
  readonly dialog = inject(MatDialog);
  employeeService = inject(EmployeeService);
  openDialog() {
    const dialogRef = this.dialog.open(EmployeeForm, {
      panelClass: 'main-dialog',
    });

    dialogRef.afterClosed().subscribe((result: EmployeeFields) => {
      if (result) {
        this.employeeService.createEmployee(result);
      }
    });
  }
}
