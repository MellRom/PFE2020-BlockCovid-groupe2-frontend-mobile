import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: '' , redirectTo: '/signin',pathMatch: 'full'},
  { path: 'signin' , component: SignInComponent},
  { path: 'scanqr' , component: ScanQrComponent},
  { path: 'accueil' , component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AccueilComponent,ScanQrComponent,SignInComponent]