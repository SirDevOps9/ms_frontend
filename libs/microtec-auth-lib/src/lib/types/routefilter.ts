import { Actions, Apps, Licenses, Services } from '.';

export interface RouteFilter {
  Action: Actions;
  License: Licenses;
  App: Apps;
  Service: Services;
}
