import { AppComponent } from './../../app.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule aqui
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule, // Adicione o HttpClientModule aqui
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
