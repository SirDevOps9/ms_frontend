import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
    constructor() {}

    print(id:string){
        const printableTable = document.getElementById(id);
    
      if (printableTable) {
        const printContents = printableTable.innerHTML;
    
        document.body.innerHTML = printContents;
    
        window.print();
    
      }else{
        console.log("errrrrrrrrr");
        
      }
      window.location.reload()
    }
}