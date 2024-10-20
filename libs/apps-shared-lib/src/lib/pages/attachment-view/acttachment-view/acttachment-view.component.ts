import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttachmentsService } from 'shared-lib';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'lib-acttachment-view',
  templateUrl: './acttachment-view.component.html',
  styleUrl: './acttachment-view.component.scss'
})
export class ActtachmentViewComponent {
  fileUrl: SafeResourceUrl | undefined;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // احصل على رابط الملف من المعاملات
    this.route.queryParams.subscribe(params => {
      const url = params['url'];
      if (url) {
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // استخدام DomSanitizer
      }
    });
  }
}
