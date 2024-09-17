import { Injectable } from '@angular/core';
import { sequenceProxy } from './sequence.proxy';
import { LanguageService, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class SequenceService {
  constructor(
    private sequenceProxy:sequenceProxy,
    private toasterService : ToasterService ,
     private languageService : LanguageService ,
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
    
    this.sequenceProxy.addSequence(sequence).subscribe({
      next: (res) => {
        if (res) {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('sequence.sequenceAdded')
          );
        }
      },
    });
  
}
}
