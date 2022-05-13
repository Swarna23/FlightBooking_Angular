import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminBlockComponent } from './admin-block/admin-block.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    HomeComponent,
    AdminBlockComponent,
    SearchFlightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HomeComponent,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
