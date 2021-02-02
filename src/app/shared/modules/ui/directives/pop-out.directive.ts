import { HttpClient } from '@angular/common/http';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, OnInit, ViewContainerRef } from '@angular/core';
import { LogoutComponent } from 'src/app/core/modules/user/components/logout/logout.component';
import { LoginComponent } from 'src/app/core/modules/user/pages/login/login.component';

@Directive({
  selector: '[appPopOut]'
})
export class PopOutDirective implements OnInit {
  @Input() private componentType: string;

  @HostListener('click') toggleComponent() {
    console.log('I was clicked,  i have to load (or unload) ' + this.componentType);
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private componentFactory: ComponentFactory<any>;
  private componentRef: ComponentRef<any>;
  
  private isOpen = false;

  constructor(
    private componentResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const components: any[] = [
      {
        type: 'logout',
        component: LogoutComponent
      }
    ];

    const component = components.find((obj: any) => obj.type === this.componentType);
    let componentObject;

    if (component === undefined) {
      componentObject = LogoutComponent;
    } else {
      componentObject = component.component;
    }
    this.componentFactory = this.componentResolver.resolveComponentFactory(componentObject);
  }

  private open(): void {
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
    this.isOpen = true;

    this.componentRef.instance.close.subscribe(() => {
      this.componentRef.instance.close.unsubscribe();
      this.componentRef.destroy();
      this.viewContainerRef.clear();
      this.isOpen = false;
    })
  }

  private close(): void {
    this.componentRef.instance.close.next();
  }
}
