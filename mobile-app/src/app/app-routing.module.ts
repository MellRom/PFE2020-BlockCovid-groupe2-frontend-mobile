import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '' , redirectTo: '/signin',pathMatch: 'full'},
  { path: 'signin' , component: SignInComponent},
  { path: 'scanqr' , component: ScanQrComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ScanQrComponent,SignInComponent]