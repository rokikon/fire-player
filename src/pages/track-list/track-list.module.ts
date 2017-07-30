import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicPageModule } from 'ionic-angular';
import { CoreModule } from '../../app/core/core.module';
import { PlayerModule } from '../../components/player/player.component.module';

import { TrackListPage } from './track-list';

@NgModule({
  imports: [
    IonicPageModule.forChild(TrackListPage),
    PlayerModule
  ],
  exports: [
    TrackListPage
  ],
  declarations: [
    TrackListPage,
    
  ],
  providers: [],
  entryComponents: [TrackListPage]
})
export class TrackListModule {
}
