import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import all the cmponents for wich navigation service has to be activated
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from "./guard/auth.guard";
import { ClienteComponent } from "./componets/clientes/cliente/cliente.component";
import { ListaClientesComponent } from "./componets/clientes/lista-clientes/lista-clientes.component";
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent,},
  { path: 'cliente', component: ClienteComponent},
  { path: 'lista-cliente', component:ListaClientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
