import { Injectable } from '@angular/core';

/* toastr is a global object. We wrap it in this service to limit access to it. */
declare let toastr:any //this tells the typscript compiler that toastr is an object that we know about

@Injectable()
export class ToastrService {

  constructor() { }
  
  //wrap the toastr methods
  success(message: string, title?: string){
    toastr.success(message, title);
  }

  info(message: string, title?: string){
    toastr.info(message, title);
  }

  warning(message: string, title?: string){
    toastr.warning(message, title);
  }

  error(message: string, title?: string){
    toastr.error(message, title);
  }
}
