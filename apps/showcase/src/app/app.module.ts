import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {YouTubePlayerStandardModule} from "@tgillespie/youtube-player";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    YouTubePlayerStandardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
