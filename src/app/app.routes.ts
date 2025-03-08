import { Routes } from '@angular/router';
import { FiltrarComponent } from './componentes/filtrar/filtrar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { TrayecoriaComponent } from './componentes/trayecoria/trayecoria.component';
import { AdministrarComponent } from './componentes/administrar/administrar.component';
import { CrearEditarComponent } from './componentes/administrar/crear-editar/crear-editar.component';
import { ListadoComponent } from './componentes/administrar/listado/listado.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { adminChildGuard, adminGuard } from './guardianes/admin.guard';
import { LoginComponent } from './componentes/login/login.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'trayectoria', component: TrayecoriaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'buscar', component: FiltrarComponent },
  {
    path: 'admin', component: AdministrarComponent,
    canActivate: [adminGuard],
    canActivateChild: [adminChildGuard],
    children: [
      { path: '', component: ListadoComponent },
      { path: 'nuevo', component: CrearEditarComponent },
      { path: 'editar/:id', component: CrearEditarComponent },
      { path: 'listado', component: ListadoComponent },
      { path: '**', component: ListadoComponent }
    ]
  },
  { path: 'error/:error', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];
