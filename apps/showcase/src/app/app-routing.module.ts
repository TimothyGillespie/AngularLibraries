import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {YouTubePlayerDemoComponent} from "./demo/youtube-player-demo/youtube-player-demo.component";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', component: YouTubePlayerDemoComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
