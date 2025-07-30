import { Component } from '@angular/core';
import { Header } from '../header/header';
import { ToolBar } from '../../tool-bar/tool-bar';

@Component({
  selector: 'app-layout',
  imports: [Header, ToolBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
