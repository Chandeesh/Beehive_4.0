import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable()
export class ToasterService {

  options: IndividualConfig;

    constructor(private toaster: ToastrService) {
        this.options = this.toaster.toastrConfig;
        this.options.positionClass = 'toast-top-center';
        this.options.timeOut = 3000;
    }

    showToast(title, message, type) {
        this.toaster.show(message, title, this.options, 'toast-' + type);
    }

}