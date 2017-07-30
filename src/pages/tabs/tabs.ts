import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  // tab1Root = 'HomePage';
  tab2Root = 'TrackListPage';
  tab3Root = 'StoredPage';
  
  // tab4Root = AboutPage;
  
  constructor(public navCtrl: NavController) {
  
  }
  
  pageChanged(event) {
  
  
  }
}
