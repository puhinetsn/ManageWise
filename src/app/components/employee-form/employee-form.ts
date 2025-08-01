import {
  Component,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Position } from '../../models/position.enum';
import { Employee } from '../../models/employee.model';

interface PositionSelectOption {
  value: Position;
  name: string;
}
@Component({
  selector: 'app-employee-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeForm {
  readonly dialogRef = inject(MatDialogRef<EmployeeForm>);
  data = inject<Employee>(MAT_DIALOG_DATA);
  isEditMode = !!this.data;
  formBuilder = inject(FormBuilder);
  employee = new FormGroup({
    fullName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    position: new FormControl<Position | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startDate: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    skills: new FormArray<
      FormGroup<{
        skill: FormControl<string>;
        yearExperience: FormControl<number>;
      }>
    >([
      new FormGroup({
        skill: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        yearExperience: new FormControl<number>(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(0)],
        }),
      }),
    ]),
  });

  constructor() {
    if (this.isEditMode && this.data) {
      this.employee.patchValue({
        fullName: this.data.fullName,
        email: this.data.email,
        position: this.data.position as Position,
        startDate: this.data.startDate,
      });

      const skillsArray = this.employee.controls.skills as FormArray;
      skillsArray.clear();

      if (this.data.skills && this.data.skills.length) {
        this.data.skills.forEach((skill) => {
          skillsArray.push(
            new FormGroup({
              skill: new FormControl<string>(skill.skill, {
                nonNullable: true,
                validators: [Validators.required],
              }),
              yearExperience: new FormControl<number>(skill.yearExperience, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0)],
              }),
            })
          );
        });
      } else {
        this.addSkillGroup();
      }
    }
  }

  addSkillGroup() {
    let skills = <FormArray>this.employee.controls.skills;
    skills.push(
      new FormGroup({
        skill: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        yearExperience: new FormControl<number>(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(0)],
        }),
      })
    );
  }

  get skills() {
    return this.employee.controls.skills;
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  positionSelectOptions: PositionSelectOption[] = [
    {
      value: Position.DEVELOPER,
      name: 'Developer',
    },
    {
      value: Position.DESIGNER,
      name: 'Designer',
    },
    {
      value: Position.QA,
      name: 'QA',
    },
    {
      value: Position.MANAGER,
      name: 'Manager',
    },
  ];

  onClose(): void {
    this.dialogRef.close();
  }

  validateEmployeeFullName() {
    const employeeFullName = this.employee.controls.fullName;
    if (employeeFullName.touched && employeeFullName.invalid) {
      if (employeeFullName.hasError('required')) {
        return 'Name is required.';
      } else if (employeeFullName.hasError('minlength')) {
        return 'Name should be at least  3 characters long.';
      }
    }
    return '';
  }

  validateEmployeeEmail() {
    const employeeEmail = this.employee.controls.email;
    if (employeeEmail.touched && employeeEmail.invalid) {
      if (employeeEmail.hasError('required')) {
        return 'Email is required.';
      } else if (employeeEmail.hasError('email')) {
        return 'Email should be valid.';
      }
    }
    return '';
  }

  validateEmployeePosition() {
    const employeePosition = this.employee.controls.position;
    if (employeePosition.touched && employeePosition.invalid) {
      if (employeePosition.hasError('required')) {
        return 'Position is required.';
      }
    }
    return '';
  }

  validateEmployeeStartDate() {
    const employeeStartDate = this.employee.controls.startDate;
    if (employeeStartDate.touched && employeeStartDate.invalid) {
      if (employeeStartDate.hasError('required')) {
        return 'Start Date is required.';
      }
    }
    return '';
  }

  validateEmployeeSkillName(index: number): string {
    const skillGroup = <FormGroup>this.employee.controls.skills.at(index);
    const skillControl = <FormControl>skillGroup.controls['skill'];

    if (skillControl.touched && skillControl.invalid) {
      if (skillControl.hasError('required')) {
        return 'Skill is required.';
      }
    }
    return '';
  }

  validateEmployeeSkillExperience(index: number): string {
    const skillGroup = <FormGroup>this.employee.controls.skills.at(index);
    const skillControl = <FormControl>skillGroup.controls['yearExperience'];

    if (skillControl.touched && skillControl.invalid) {
      if (skillControl.hasError('required')) {
        return 'Years of experience is required.';
      } else if (skillControl.hasError('min')) {
        return 'Experience should be at least  0 years.';
      }
    }
    return '';
  }

  onCreate(): void {
    this.dialogRef.close(this.employee.value);
  }
}
