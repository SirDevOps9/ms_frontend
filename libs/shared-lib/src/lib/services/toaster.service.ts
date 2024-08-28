import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToasterModel } from '../models/toaster.model';
import { LanguageService } from './language.service';

import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToasterService {

  constructor(
    private languageService: LanguageService,
    private messageService: MessageService
  ) {}

  showConfirm(ConfirmButtonText: string): Promise<boolean> {
    return Swal.fire({
      title: this.languageService.transalte('Toaster.Confirm.Title'),
      text: this.languageService.transalte('Toaster.Confirm.Text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.languageService.transalte('Toaster.Confirm.CancelButtonText'),
      confirmButtonText:
        this.languageService.transalte('Toaster.Confirm.ConfirmButtonTexttochangstatus') 
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  showSuccess(title: string, message: string) {
    this.messageService.add({
      severity: 'success',
      summary:title,
      detail: message,
      life: 5000,
      
    });
  
  }

  showError(title: string, message: string) {
    this.messageService.add({
      severity: 'error',
      summary:title,
      detail: message,
      life: 5000,
      
    });
   
  }

}
