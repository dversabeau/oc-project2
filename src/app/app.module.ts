import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponentComponent } from './pie-chart-component/pie-chart-component.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { DetailsCountryComponent } from './details-country/details-country.component';

PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponentComponent, DetailsCountryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PlotlyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
