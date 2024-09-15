import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Menu } from '../pages-menu';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  menu: NbMenuItem[];
  menuProvider: Menu = new Menu();

  constructor() {
    this.menu = this.menuProvider.exportarMenu();
  }
}
