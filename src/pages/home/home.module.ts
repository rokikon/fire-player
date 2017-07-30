import { NgModule } from '@angular/core';

import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  imports: [IonicPageModule.forChild(HomePage)],
  exports: [],
  declarations: [HomePage],
  entryComponents: [HomePage]
})
export class HomeModule {
}
