import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeForm } from '../employee-form/employee-form';
import { EmployeeService } from '../../services/employee-service';
import { EmployeeFields } from '../../models/employee.model';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tool-bar',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
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
  searchControl = new FormControl('');
  searchChanged = output<string>();
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => (value ?? '').trim().toLowerCase()),
        filter((value) => value.length === 0 || value.length >= 2),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.searchChanged.emit(value);
      });
  }

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

  searchQuery(value: string) {
    this.router.navigate([], {
      queryParams: { searchBy: value },
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
