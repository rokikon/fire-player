import { Action } from '@ngrx/store';

export const SEARCH_START = '[SEARCH] START';
export const SEARCH_COMPLETE = '[SEARCH] COMPLETE';
export const SEARCH_FAILED = '[SEARCH] FAILED';

export class SearchStart implements Action {
  readonly type = SEARCH_START;
}
export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;
}
export class SearchFailed implements Action {
  readonly type = SEARCH_FAILED;
}
