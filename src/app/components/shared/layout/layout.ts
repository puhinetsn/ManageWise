import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  readonly route = inject(ActivatedRoute);
  sortBy = signal<'name' | 'date' | 'skills' | undefined>(undefined);
  sortOrder = signal<'asc' | 'desc' | undefined>(undefined);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { sortBy, sortOrder } = params;
      this.sortBy.set(
        sortBy === 'name' || sortBy === 'date' || sortBy === 'skills'
          ? sortBy
          : undefined
      );
      this.sortOrder.set(
        sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : undefined
      );
    });
  }

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
