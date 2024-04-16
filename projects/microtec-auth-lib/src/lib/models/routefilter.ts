import { Actions } from './actions';
import { Apps } from './apps';
import { Licenses } from './licenses';

export interface RouteFilter {
  Action: Actions;
  License: Licenses;
  App: Apps;
}
