import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {YouTubePlayerModule} from "@tgillespie/youtube-player";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { YouTubePlayerDemoComponent } from './demo/youtube-player-demo/youtube-player-demo.component';
import { AppRoutingModule } from './app-routing.module';
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [AppComponent, YouTubePlayerDemoComponent],
  imports: [
    BrowserModule,
    CommonModule,
    YouTubePlayerModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
