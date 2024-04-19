import { Routes, RouterModule } from '@angular/router';
import { BuscarPersonagemComponent } from './buscar-personagem/buscar-personagem.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  { path: '', redirectTo: '/buscar', pathMatch: 'full' },
  { path: 'buscar', component: BuscarPersonagemComponent },
  { path: 'favoritos', component: FavoritosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
