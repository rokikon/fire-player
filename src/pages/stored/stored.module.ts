import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicPageModule } from 'ionic-angular';
import { CoreModule } from '../../app/core/core.module';
import { PlayerModule } from '../../components/player/player.component.module';

import { StoredPage } from './stored';

@NgModule({
  imports: [
    IonicPageModule.forChild(StoredPage),
    PlayerModule
  ],
  exports: [],
  declarations: [
    StoredPage
  ],
  providers: [],
  entryComponents: [StoredPage]
})
export class StoredModule {
}
