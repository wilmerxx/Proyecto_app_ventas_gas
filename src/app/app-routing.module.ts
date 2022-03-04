import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'set-productos', component: SetProductosComponent },
  { path: 'pedidos', component: PedidosComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
