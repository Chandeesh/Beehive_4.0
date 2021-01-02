import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user.service';
import { ToasterService } from './toaster/toaster.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginUserComponent } from './login-user/login-user.component';
import { ViewBeehiveComponent } from './view-beehive/view-beehive.component';
import { BeehiveWeightComponent } from './beehive-weight/beehive-weight.component';
import { BeehiveYieldComponent } from './beehive-yield/beehive-yield.component';
import { BeehiveTemperatureComponent } from './beehive-temperature/beehive-temperature.component';
import { CheckMailComponent } from './check-mail/check-mail.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    LoginUserComponent,
    ViewBeehiveComponent,
    BeehiveWeightComponent,
    BeehiveYieldComponent,
    BeehiveTemperatureComponent,
    CheckMailComponent,
    ConfirmUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
	  MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
   ],
  providers: [UserService, ToasterService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
