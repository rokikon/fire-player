import { Component, Input, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from '../../app/core/file.service';
import { PlaylistService } from '../../app/core/playlist.service';
import { IPlayListItem } from './list.model';
import { PlayerService } from '../../app/core/player.service';

/**
 * Generated class for the PlaylistItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'playlist-item',
  templateUrl: './list-item.html'
})
export class PlaylistItemComponent {
  
  @Input() track: IPlayListItem;
  @Input() source;
  loadingSubscription: Subscription;
  progressSubscription: Subscription;
  loading = false;
  progress = 0;
  
  constructor(private zone: NgZone,
              private fs: FileService,
              private playlistService: PlaylistService,
              private playerService: PlayerService) {
    // this.playlistService.currentTrack
    //   .subscribe(track => {
    //     this.track.playing = track.uid === this.track.uid;
    //   });
    this.playerService.isPlaying
      .subscribe(isPlaying => {
      this.track.playing = isPlaying;
    });
    
  }
  
  download(track: IPlayListItem) {
    this.loadingSubscription = this.fs.loading
      .skip(1)
      .subscribe(loading => {
        this.zone.run(() => {
          if (!loading) {
            this.loadingSubscription.unsubscribe();
            this.progressSubscription.unsubscribe();
          }
          track.loading = loading;
        });
      });
    this.progressSubscription = this.fs.progress
      .skip(1)
      .distinctUntilChanged()
      .subscribe((progress: number) => {
        this.zone.run(() => {
          track.progress = progress;
        });
      });
    this.fs.download(track);
  }
  
  select(track: IPlayListItem) {
    this.playlistService.selectTrack(track);
  }
  
  deleteTrack(track: IPlayListItem) {
    track.playing = !track.playing;
    this.playlistService.deleteTrack(track);
  }
}

