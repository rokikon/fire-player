import { NgModule } from '@angular/core';
import { PlayerComponent } from './player.component';
import { IonicPageModule } from 'ionic-angular';
import { ProgressBarComponent } from '../progress-bar/progress-bar';
import { PlaylistItemComponent } from '../list-item/list-item';
import { ControlsComponent } from '../controls/controls.component';

@NgModule({
  imports: [IonicPageModule.forChild(PlayerComponent)],
    declarations: [
      PlayerComponent,
      ControlsComponent,
      PlaylistItemComponent,
      ProgressBarComponent
    ],
    exports: [
      PlayerComponent,
      ControlsComponent,
      PlaylistItemComponent,
      ProgressBarComponent
    ]
})
export class PlayerModule {
}
