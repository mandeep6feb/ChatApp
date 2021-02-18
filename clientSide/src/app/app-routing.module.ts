import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
	{path: '', redirectTo: '/user-login' , pathMatch: 'full'},
	{path: 'user-register' , component: UserRegisterComponent},
	{path: 'user-login' , component: UserComponent},
	{path: 'chat', component: DashboardComponent},
	{path: 'chat/:id', component: DashboardComponent},
	// { path: '', component: HomeComponent },
	// { path: ':roomName', component: VideoRoomComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
