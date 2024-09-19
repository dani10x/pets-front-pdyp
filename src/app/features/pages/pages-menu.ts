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
          },
          {
            title: 'Crear mascota',
            icon: 'plus-circle-outline',
            link: 'mascotas/form'
          }
        ]
       },
       {
         title: 'MEDICAMENTOS',
         icon: 'activity-outline',
         children: [
           {
             title: 'Consultar Medicamentos',
             icon: 'list-outline',
             link: 'medicamentos/lista'
           },
           {
            title: 'Agregar Medicamentos',
            icon: 'plus-circle-outline',
            link: 'medicamentos/form'
          }
         ]
       }
    ]
  }
}
