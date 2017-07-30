import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SearchService } from '../../app/core/search.service';
import { IPlayListItem } from '../../components/list-item/list.model';

/**
 * Generated class for the TrackListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-track-list',
  templateUrl: 'track-list.html'
})
export class TrackListPage {
  tracks: IPlayListItem[] = [];
  scroll: any;
  loading = false;
  query = '';
  offset = 0;
  index = 0;
  
  // noinspection JSUnusedGlobalSymbols
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private searchService: SearchService,
              private platform: Platform) {
    this.platform.ready().then(() => {
      searchService.getSearchResults(this.query, this.offset);
      searchService.results
        .skip(1)
        .share()
        .subscribe((tracks: IPlayListItem[]) => {
          this.loading = false;
          this.tracks = [...this.tracks, ...tracks];
          this.scroll ? this.scroll.complete() : 'return';
        });
    });
  }
  
  getItems(event) {
    this.tracks = [];
    this.offset = 0;
    this.query = event.target.value;
    this.searchService.getSearchResults(event.target.value, this.offset);
  }
  
  doInfinite(scroll) {
    this.scroll = scroll;
    this.offset += 50;
    this.loading = true;
    this.searchService.getSearchResults(this.query, this.offset);
  }
  
  onLoad(event) {
    this.tracks[event.track.index].progress = event.progress;
  }
  
}
