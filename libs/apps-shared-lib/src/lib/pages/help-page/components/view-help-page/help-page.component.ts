import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Location } from '@angular/common';
import { HelpPageService } from '../../help-page.service';
import { CreateHelpPageDto } from '../../models/CreateHelpPageDto';
import { LanguageService } from 'shared-lib';
@Component({
  selector: 'lib-help-page',
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.css'
})
export class HelpPageComponent  implements OnInit {
  helpPage!:CreateHelpPageDto;
  servicePage: number;
  sanitizedContent: SafeHtml;
  language:any
  
  constructor(
    private route: ActivatedRoute,
    private helpPageService: HelpPageService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private languageService: LanguageService
  ) {
   
  }
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('servicePage');
    if (idParam) {
      this.servicePage = +idParam;  // Convert the id to a number using the unary plus operator
    }
    this.initItemDefinitioHasHelpPage();
    this.languageService.language$.subscribe((lang) => {
      this.language = lang
    });
  }
  initItemDefinitioHasHelpPage() {
      this.helpPageService.GetHelpPageByServiceId(this.servicePage).subscribe({
        next: (res) => {
          this.helpPage=res;
          let content=this.language === 'ar'?this.helpPage.helpPageDetails.contentAr:this.helpPage.helpPageDetails.contentEn;
          if (this.helpPage && this.helpPage.helpPageDetails && content) {
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
              content);
          }
        },
      });
      
    }
}
