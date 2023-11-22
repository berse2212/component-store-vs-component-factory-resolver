import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver, DestroyRef,
  EmbeddedViewRef,
  Injector, OnDestroy,
  OnInit,
  ViewContainerRef
} from "@angular/core";
import { ComponentPortal } from "@angular/cdk/portal";
import { DummyComponent } from "./dummy/dummy.component";
import { Overlay } from "@angular/cdk/overlay";
import { CoolStore } from "./coolstore/cool-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'AngularTestProject';

  constructor(
    private overlay: Overlay,
    private coolStore: CoolStore, //Problematik Injection!
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  createViaPortal() {
    this.overlay.create().attach(new ComponentPortal(DummyComponent))
  }

  createComponentManuallyViaFactoryResolver() {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(DummyComponent)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);
  }

  createComponentManuallyViaViewContainerRef() {
    // 1. Create a component reference from the component
    const componentRef = this.viewContainerRef.createComponent(DummyComponent);

    // 2. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 3. Append DOM element to the body
    document.body.appendChild(domElem);
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }
}
