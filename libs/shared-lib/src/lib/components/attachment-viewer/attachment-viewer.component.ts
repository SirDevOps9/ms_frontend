import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AttachmentsService } from '../../services';
import { AttachmentDto } from '../../models';

@Component({
  selector: 'lib-attachment-viewer',
  templateUrl: './attachment-viewer.component.html',
  styleUrls: ['./attachment-viewer.component.scss'],
})
export class AttachmentViewerComponent implements OnInit, OnChanges {
  @Input() attachmentId: string;
  @Input() style: string;
  @Input() className: string;
  imageData: string;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('attachmentId' in changes) {
      this.setImage();
    }
  }

  private setImage() {
    if (this.attachmentId) {
      this.attachmentService
        .getAttachment(this.attachmentId)
        .subscribe((response: AttachmentDto) => {
          if (response?.fileContent) {
            const source = `${response.base64Padding},${response.fileContent}`;
            this.imageData = source;
          }
        });
    }
  }

  constructor(private attachmentService: AttachmentsService) { }
}
