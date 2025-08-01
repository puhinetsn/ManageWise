import { Component, inject, input, output, signal } from '@angular/core';
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
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  templateUrl: './tool-bar.html',
  styleUrl: './tool-bar.scss',
})
export class ToolBar {
  readonly dialog = inject(MatDialog);
  employeeService = inject(EmployeeService);
  showSkills = input.required<boolean>();
  showSkillsChanged = output<boolean>();
  customInfo = input.required<boolean>();
  customInfoChanged = output<boolean>();
  customActions = input.required<boolean>();
  customActionsChanged = output<boolean>();
  router = inject(Router);

  showSkillsCheck($event: MatSlideToggleChange) {
    this.showSkillsChanged.emit($event.checked);
  }

  customInfoCheck($event: MatSlideToggleChange) {
    this.customInfoChanged.emit($event.checked);
  }

  customActionsCheck($event: MatSlideToggleChange) {
    this.customActionsChanged.emit($event.checked);
  }

  sortBy(field: 'name' | 'date' | 'skills', order: 'asc' | 'desc') {
    this.router.navigate([], {
      queryParams: { sortBy: field, sortOrder: order },
      queryParamsHandling: 'merge',
    });
  }

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
