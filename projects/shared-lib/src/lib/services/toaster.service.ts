import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToasterModel } from '../models/toaster.model';
import { LanguageService } from './language.service';
@Injectable({ providedIn: 'root' })
export class ToasterService {
  constructor(private languageService: LanguageService) {}
  // ViewToaster(model: ToasterModel) {
  //   model.position = model.position || 'center';
  //   model.icon = model.icon || 'success';
  //   if (model.toast && model.toast === true) {
  //     model.position = 'top-right';
  //   }
  //   Swal.fire({
  //     text: model.message,
  //     title: model.title,
  //     toast: model.toast,
  //     icon: model.icon,
  //     position: model.position,
  //   });
  // }
  showConfirm(ConfirmButtonText:string ): Promise<boolean> {
    return Swal.fire({
      title: this.languageService.transalte('Toaster.Confirm.Title'),
      text: this.languageService.transalte('Toaster.Confirm.Text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.languageService.transalte(
        'Toaster.Confirm.CancelButtonText'
      ),
      confirmButtonText: this.languageService.transalte(
        'Toaster.Confirm.'+ConfirmButtonText
        ),
        
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  showSuccess(title: string, message: string) {
    Swal.fire({
      text: message,
      title: title,
      toast: true,
      icon: 'success',
      position: 'top-right',
    });
  }

  showError(title: string, message: string) {
    Swal.fire({
      text: message,
      title: title,
      toast: true,
      icon: 'error',
      position: 'top-right',
    });
  }
}
