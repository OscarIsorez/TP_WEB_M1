import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MyComponent } from './my-component/my-component';
import { FormsModule } from '@angular/forms';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe-pipe'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { P } from '@angular/cdk/keycodes';
import { Pokedex } from './pokedex';
import { HttpClientModule } from '@angular/common/http';
import { DisplayPokeDetails } from './display-poke-details/display-poke-details';

@NgModule({
  declarations: [
    App,
    MyComponent,
    FilterPokemonPipePipe,
    DisplayPokeDetails,
  ],
  imports: [
    FormsModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    [Pokedex]
  ],
  bootstrap: [App]
})
export class AppModule { }
