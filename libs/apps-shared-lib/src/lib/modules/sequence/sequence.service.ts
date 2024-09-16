import { Injectable } from '@angular/core';
import { sequenceProxy } from './sequence.proxy';
import { LanguageService, LoaderService, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class SequenceService {
  constructor(
    private sequenceProxy:sequenceProxy,
    private toasterService : ToasterService ,
     private languageService : LanguageService ,
      private loaderService : LoaderService
  ){}
  
  getBranch()  {
    return this.sequenceProxy.getBranch()
   }
   getCompany()  {
    return this.sequenceProxy.getCompany()
   }
   getSequence(screen:string)  {
    return this.sequenceProxy.getSequence(screen)
   }
   addSequence(sequence:any){
    console.log(sequence ,"444444444");
    
    this.sequenceProxy.addSequence(sequence).subscribe({
      next: (res) => {
        if (res) {
          this.toasterService.showSuccess(
            this.languageService.transalte('add-paymentterm.success'),
            this.languageService.transalte('add-paymentterm.add')
          );
        }
      },
      error: (err) => {
        // Handle the error appropriately
        this.toasterService.showError(
          this.languageService.transalte('add-paymentterm.error'),
          this.languageService.transalte('add-paymentterm.add')
        );
      }
    });
  
}
}
