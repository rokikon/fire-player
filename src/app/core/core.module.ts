import { NgModule } from '@angular/core';
import { FileService } from './file.service';
import { PlayerService } from './player.service';
import { PlaylistService } from './playlist.service';
import { SearchService } from './search.service';


@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [FileService, PlayerService, PlaylistService, SearchService]
})
export class CoreModule {
}
