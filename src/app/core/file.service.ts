import { Injectable } from '@angular/core';
import { DirectoryEntry, Entry, File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IPlayListItem } from '../../components/list-item/list.model';

const BASE_PATH = 'cdvfile://localhost/persistent/lib/';

@Injectable()
export class FileService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loading: Observable<boolean> = this.loading$.asObservable();
  progress$: BehaviorSubject<number> = new BehaviorSubject(0);
  progress: Observable<number> = this.progress$.asObservable();
  
  
  constructor(private transfer: FileTransfer,
              private storage: Storage,
              private file: File) {
  }
  
  download(track) {
    console.log(track);
    this.loading$.next(true);
    const filename = track.uid;
    const path = `${BASE_PATH}${filename}`;
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    fileTransfer.onProgress((progress: ProgressEvent) => {
      this.progress$.next(Math.ceil((100 * progress.loaded) / progress.total));
    });
    fileTransfer.download(track.downloadUrl, path)
      .then((entry) => {
        console.log('download complete: ' + entry.toURL());
        
        track.loaded = true;
        track.path = path;
        
        this.loading$.next(false);
        this.storage.set(filename, track)
          .then((result) => console.log(result))
          .catch(err => {
          });
      }, (error) => {
        // handle error
      });
  }
  deleteTrack(track) {
    const filename = track.uid;
    this.file.resolveLocalFilesystemUrl(track.path).then(value => {
      value.remove(() => {
        this.storage.remove(filename).then(() => {
    
        });
      });
    })
  }
  
  getStored(): Promise<IPlayListItem[]> {
    let tracks: IPlayListItem[] = [];
    let keys;
    let keychain;
    return this.storage.ready()
      .then(() => {
        return this.file.resolveDirectoryUrl(BASE_PATH);
      })
      .then((directory: DirectoryEntry) => {
        directory
          .createReader()
          .readEntries((entries: Entry[]) => {
            console.log(entries);
            keys = entries.map(entry => encodeURI(entry.name));
          });
        return this.storage.keys();
      })
      .then((storageKeys) => {
        console.log(storageKeys);
        keychain = keys.filter(key => {
          return storageKeys.includes(key);
        });
        return this.storage.forEach((v, k, i) => {
          if (keychain.includes(k)) tracks.push(v);
        });
      })
      .then(() => {
        return tracks.map(track => {
          track.playing = false;
          return track;
        });
      });
  }
}
