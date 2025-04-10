import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMessage]'
})
export class MessageDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
