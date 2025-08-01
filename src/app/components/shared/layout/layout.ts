import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { ToolBar } from '../../tool-bar/tool-bar';
import { EmployeeList } from '../../employee-list/employee-list';

@Component({
  selector: 'app-layout',
  imports: [Header, ToolBar, EmployeeList],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  showSkills = signal(true);
  customActions = signal(true);
  customInfo = signal(true);

  showSkillsChanged($value: boolean) {
    this.showSkills.set($value);
  }

  showCustomInfo($value: boolean) {
    this.customInfo.set($value);
  }
  showCustomActions($value: boolean) {
    this.customActions.set($value);
  }
}
