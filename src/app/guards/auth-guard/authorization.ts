import {Route} from "@angular/router";


export interface Authorization extends Route{
  authorizedRoles?:any[];
  permitAll?: boolean;
  children?: AuthorizedRoutes;

}
export declare type AuthorizedRoutes = Authorization[]
