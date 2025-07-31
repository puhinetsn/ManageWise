import { Component, input, TemplateRef } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Employee } from '../../../models/employee.model';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
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
  actionsTemplate = input<TemplateRef<void>>();
}
