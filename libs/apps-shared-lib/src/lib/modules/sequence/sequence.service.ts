import { Injectable } from '@angular/core';
import { sequenceProxy } from './sequence.proxy';
import { LanguageService, RouterService, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class SequenceService {
  constructor(
    private sequenceProxy:sequenceProxy,
    private toasterService : ToasterService ,
     private languageService : LanguageService ,
     private routerService: RouterService,

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
 isHaveSequence(screen:any , url:string){
  this.getSequence(screen).subscribe((sequence:any) => {
    console.log(sequence ,"sequence");
    if(sequence){
   this.routerService.navigateTo(url);

    }else{
      this.toasterService.showError(
        this.languageService.transalte('error'),
        this.languageService.transalte('sequence.pleaseAddSequenceFirst')
      );
    }
    })
 }
}
