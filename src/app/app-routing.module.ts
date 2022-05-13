import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBlockComponent } from './admin-block/admin-block.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'user',
    component : UserComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'admin',
    component : AdminComponent
  },
  {
    path:'admin-block',
    component : AdminBlockComponent
  },
  {
    path : 'search-flight',
    component : SearchFlightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
