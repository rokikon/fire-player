import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { PlaylistService } from '../../app/core/playlist.service';
import { IPlayListItem } from '../../components/list-item/list.model';
import { PlayerService } from '../../app/core/player.service';

@IonicPage()
@Component({
  selector: 'page-stored',
  templateUrl: 'stored.html'
})
export class StoredPage {
  
  tracks: IPlayListItem[] = [];
  track: IPlayListItem;
  
  constructor(public navCtrl: NavController,
              private platform: Platform,
              private playlistService: PlaylistService,
              private playerService: PlayerService) {
    this.platform.ready().then(() => {
  
      this.playlistService.playlist$
        .skip(1)
        .subscribe(tracks => this.tracks = tracks || []);
      this.track = this.playerService.track;
    });
  }
  ionViewWillEnter () {
    this.playlistService.getLibrary();
  
  }
  onLoad(event) {
    this.tracks[event.track.index].progress = event.progress;
  }
  
  
}
