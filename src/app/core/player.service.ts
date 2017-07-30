import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';
import { MusicControls } from '@ionic-native/music-controls';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IPlayListItem } from '../../components/list-item/list.model';
import { PlaylistService } from './playlist.service';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/debounceTime'

@Injectable()
export class PlayerService {
  isPlaying$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isPlaying: Observable<boolean> = this.isPlaying$.asObservable();
  mediaObject: MediaObject;
  track: IPlayListItem;
  
  constructor(private media: Media,
              private playlistService: PlaylistService,
              private platform: Platform) {
    this.platform.ready().then(() => {
      this.mediaObject = this.media.create('temp.m4a');
    });
    playlistService.currentTrack
      .debounceTime(1000)
      .subscribe((track: IPlayListItem) => {
        if (!this.track || this.track.uid !== track.uid) {
          console.log(track);
          this.isPlaying$.next(false);
          this.track = track;
          this.mediaObject.stop();
          this.initPlayer(track);
        } else {
          this.togglePlay();
        }
      });
  }
  
  initPlayer(track) {
    console.log("TRACK: ", track.title);
    const filename = track.loaded ? track.path : track.url;
    this.mediaObject = this.media.create(filename);
    this.setupPlayer(track);
    this.togglePlay();
  }
  
  setupPlayer(track: IPlayListItem) {
    let interval;
    this.mediaObject.onStatusUpdate.subscribe(status => {
      console.log("CURRENT STATUS", status);
      if (status === 2) {
      
      //   interval = setInterval(() => {
      //     this.mediaObject.getCurrentPosition()
      //       .then((position: number) => {
      //       })
      //       .catch(error => {
      //       });
      //   }, 500);
      }
      
      if (status === 3) {
      
      }
      if (status === 4) {
        // clearInterval(interval);
      }
    });
    this.mediaObject.setVolume(1);
    
  }
  nextTrack() {
    this.mediaObject.stop();
    this.playlistService.selectTrack(this.playlistService.playlist[this.track.index + 1]);
  }
  previousTrack() {
    this.mediaObject.stop();
    this.playlistService.selectTrack(this.playlistService.playlist[this.track.index - 1]);
  }
  togglePlay() {
    if (this.isPlaying$.value) {
      this.isPlaying$.next(false);
      this.mediaObject.pause();
    } else {
      this.isPlaying$.next(true);
      this.mediaObject.play();
    }
  }
  selectTrack(track) {
    if (this.track !== track) {
      this.mediaObject.stop();
      this.isPlaying$.next(false);
    }
  }
  
}
