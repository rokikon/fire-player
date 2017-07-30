import { Component } from '@angular/core';
import { PlayerService } from '../../app/core/player.service';
import { PlaylistService } from '../../app/core/playlist.service';
import { IPlayListItem } from '../list-item/list.model';
import 'rxjs/add/operator/share';

@Component({
  selector: 'fire-player-controls',
  templateUrl: './controls.component.html'
})
export class ControlsComponent {
  track: IPlayListItem;
  isPlaying = false;
  
  constructor (private playerService: PlayerService, private playlistService: PlaylistService) {
    this.playerService.isPlaying
      .share()
      .subscribe(playing => {
        console.log("PLAYING: ", playing);
        this.isPlaying = playing;
      });
    this.playlistService.currentTrack
      .share()
      .subscribe(track => this.track = track)
  }
  
  nextTrack() {
    this.playerService.nextTrack();
  }
  
  previousTrack() {
    this.playerService.previousTrack();
  }
  
  togglePlay() {
    this.playerService.togglePlay();
  }
}
