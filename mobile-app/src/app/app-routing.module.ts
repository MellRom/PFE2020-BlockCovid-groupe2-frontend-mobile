import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { OfflineComponent } from './offline/offline.component';
import { CovidComponent } from './covid/covid.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'offline', component: OfflineComponent },
  { path: 'scanqr', component: ScanQrComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'covid', component: CovidComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  ScanQrComponent,
  SignInComponent,
  SuccessComponent,
  ErrorComponent,
  CovidComponent,
  OfflineComponent,
];
