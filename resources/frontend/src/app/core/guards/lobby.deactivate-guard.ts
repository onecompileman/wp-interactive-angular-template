import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LandingLobbyComponent } from "src/app/lobby/landing-lobby/landing-lobby.component";
import { ModalService } from "../services/modal.service";

@Injectable({ providedIn: 'root' })
export class LobbyDeactivateGuard implements CanDeactivate<any> {

  constructor(private modalService: ModalService) {}

  canDeactivate(
    component: LandingLobbyComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    this.modalService.killAll();
    return true;
  }
}