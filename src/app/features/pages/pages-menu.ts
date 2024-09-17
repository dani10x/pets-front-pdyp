import { NbMenuItem } from "@nebular/theme";

export class Menu {

  private MENU_ITEMS: NbMenuItem[];

  constructor() {
    this.MENU_ITEMS = this.buildMenu();
  }

  public exportarMenu(): NbMenuItem[] {
    return this.MENU_ITEMS;
  }

  private buildMenu(): NbMenuItem[] {
    return [
      {
        title: 'CLIENTES',
        icon: 'people-outline',
        children: [
          {
            title: 'Consultar Clientes',
            icon: 'person-outline',
            link: 'clientes/lista'
          },
          {
            title: 'Agregar Clientes',
            icon: 'plus-circle-outline',
            link: 'clientes/form'
          }
        ]
      },
      {
        title: 'MASCOTAS',
        icon: 'github-outline',
        children: [
          {
            title: 'Consultar Mascotas',
            icon: 'list-outline',
            link: 'mascotas/lista'
          }
        ]
      }
    ]
  }
}
