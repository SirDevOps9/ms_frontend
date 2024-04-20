import { Actions } from './actions';
import { Apps } from './apps';
import { Licenses } from './licenses';
import { Services } from './services';

export interface RouteFilter {
  Action: Actions;
  License: Licenses;
  App: Apps;
  Service: Services;
}
