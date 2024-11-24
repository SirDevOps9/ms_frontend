import { Component, OnInit } from '@angular/core';
import { HelpPageService } from '../../services/help-page.service';
import { ActivatedRoute } from '@angular/router';
import { CreateHelpPageDto } from '../../models/CreateHelpPageDto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditHelpPageDetailsDto } from '../../models/EditHelpPageDetailsDto';

import { Location } from '@angular/common';
@Component({
  selector: 'lib-help-page',
  standalone: false,
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.css'
})
export class HelpPageComponent  implements OnInit {
  helpPage:CreateHelpPageDto;
  servicePage: number;
  sanitizedContent: SafeHtml;
  
  constructor(
    private route: ActivatedRoute,
    private helpPageService: HelpPageService,
    private sanitizer: DomSanitizer,
    private location: Location
  ) {
   
  }
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('servicePage');
    if (idParam) {
      this.servicePage = +idParam;  // Convert the id to a number using the unary plus operator
    }
    this.initItemDefinitioHasHelpPage();
  }
  initItemDefinitioHasHelpPage() {
      this.helpPageService.GetHelpPageByServiceId(this.servicePage).subscribe({
        next: (res) => {
          this.helpPage=res;
          if (this.helpPage && this.helpPage.helpPageDetails && this.helpPage.helpPageDetails.content) {
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.helpPage.helpPageDetails.content);
          }
        },
      });
      
    }
    goBack(): void {
      this.location.back();
    }
}
