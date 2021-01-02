import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ViewBeehiveComponent } from './view-beehive/view-beehive.component';
import { BeehiveWeightComponent } from './beehive-weight/beehive-weight.component';
import { BeehiveYieldComponent } from './beehive-yield/beehive-yield.component';
import { BeehiveTemperatureComponent } from './beehive-temperature/beehive-temperature.component';
import { CheckMailComponent } from './check-mail/check-mail.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'loginuser', component: LoginUserComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: '', component: LoginUserComponent },
  {
    path: 'viewbeehive',
    component: ViewBeehiveComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'weight', component: BeehiveWeightComponent, canActivate: [AuthGuard] },
      { path: 'Yield', component: BeehiveYieldComponent, canActivate: [AuthGuard] },
      { path: 'Temperature', component: BeehiveTemperatureComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'checkmail', component: CheckMailComponent },
  { path: 'confirmuser', component: ConfirmUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginUserComponent,
  UserFormComponent,
  ViewBeehiveComponent,
  BeehiveWeightComponent,
  BeehiveYieldComponent,
  BeehiveTemperatureComponent,
  CheckMailComponent,
  ConfirmUserComponent];
