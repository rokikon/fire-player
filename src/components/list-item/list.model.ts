export interface IPlayListItem {
    artist: string;
    title: string;
    cover: string;
    url: string;
    duration?: any;
    progress?: number;
    playing?: boolean;
    index?: number;
    loaded?: boolean;
    path?: string;
    loading?: boolean;
    uid?: string;
}
export class PlayListItem implements IPlayListItem {
  artist: string;
  title: string;
  cover: string;
  url: string;
  
  constructor() {
    this.artist = '';
    this.title = '';
    this.cover = '';
    this.url = '';
  }
}

export interface IPlayList extends IPlayListItem {
    readonly length: number;
    playlistId?: string;
}
