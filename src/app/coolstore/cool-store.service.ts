import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface CoolState {
  isCool: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CoolStore extends ComponentStore<CoolState> {
  constructor(

  ) {
    super({
      isCool: false
    });
  }
}