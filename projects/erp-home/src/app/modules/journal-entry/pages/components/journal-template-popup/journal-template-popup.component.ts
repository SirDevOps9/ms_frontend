import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-journal-template-popup',
  templateUrl: './journal-template-popup.component.html',
  styleUrls: ['./journal-template-popup.component.css']
})
export class JournalTemplatePopupComponent implements OnInit {

  ngOnInit() {
  }
  get subdomainId(): number {
    return this.config.data.Id;
  }
  constructor(public config: DynamicDialogConfig) { }


  

}
