import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IPlayListItem } from '../../components/list-item/list.model';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Storage } from '@ionic/storage';


@Injectable()
export class SearchService {

  results$: BehaviorSubject<IPlayListItem[]> = new BehaviorSubject([]);
  results: Observable<IPlayListItem[]> = this.results$.asObservable();
  query: Observable<string> = Observable.of('');
  offset = 0;


  constructor(private http: HTTP, private platform: Platform, private file: File, private storage: Storage) {
    this.platform.ready().then(() => {
      this.query
        .skip(1)
        .subscribe(query => {
          this.getSearchResults(query, 0);
        });
    })
    
  }

  getSearchResults(query, offset) {
    const apiUrl = 'https://shielded-everglades-19950.herokuapp.com';
    const _query = query ? `${query}` : '';
    const _offset = offset ? `${offset}` : '';
    this.http.post(`${apiUrl}/search`, {q: _query, offset: _offset}, {})
      .then((result: HTTPResponse) => {
      
        return this.mapTracks(JSON.parse(result.data));
      })
      .then(items => this.results$.next(items))
      .catch(e => console.log(e));
  }
  
  mapTracks(tracks: IPlayListItem[]) {
    return tracks.map((track: IPlayListItem) => {
      const filename = track.uid;
      const path = `cdvfile://localhost/persistent/lib/`;
      track.duration = Math.ceil(track.duration / 60) + ':' + track.duration % 60;
      this.storage.get(filename).then(value => {
        if (value) {
          
          track.path = path + filename;
          track.loaded = true;
          this.storage.set(track.uid, track)
        }
      });
      return track;
    });
  }
}
