import { Injectable } from '@angular/core';
import 'rxjs/add/operator/share';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IPlayListItem, PlayListItem } from '../../components/list-item/list.model';
import { FileService } from './file.service';
import { SearchService } from './search.service';


@Injectable()
export class PlaylistService {
  playlist$: BehaviorSubject<IPlayListItem[]> = new BehaviorSubject([]);
  playlist: IPlayListItem[] = [];
  status = 0;
  currentTrack$: BehaviorSubject<IPlayListItem> = new BehaviorSubject(new PlayListItem());
  currentTrack: Observable<IPlayListItem> = this.currentTrack$.asObservable();
  player: any;
  
  constructor(private searchService: SearchService, private fileService: FileService) {
    
    this.searchService.results
      .share()
      .subscribe((results) => {
        this.playlist = results;
      });
  }
  
  selectTrack(track: IPlayListItem) {
    this.currentTrack$.next(track);
    
  }
  deleteTrack(track: IPlayListItem) {
    this.playlist.map(track => {
      track.playing = false;
      return track;
    });
    this.fileService.deleteTrack(track);
    this.currentTrack$.next(new PlayListItem());
    this.getLibrary();
  }
  
  
  getLibrary() {
    this.fileService.getStored().then(tracks => {
      this.playlist = tracks;
      this.playlist$.next(tracks)
    })
  }
}
