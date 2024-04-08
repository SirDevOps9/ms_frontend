import { Component, Input, OnInit, input } from '@angular/core';
import { AttachmentsService } from '../../services';
import { AttachmentDto } from '../../models';

@Component({
  selector: 'lib-attachment-viewer',
  templateUrl: './attachment-viewer.component.html',
  styleUrls: ['./attachment-viewer.component.css'],
})
export class AttachmentViewerComponent implements OnInit {
  @Input() attachmentId: string;
  @Input() width: number;
  imageData: string;

  ngOnInit() {
    this.attachmentService
      .getAttachment(this.attachmentId)
      .subscribe((response: AttachmentDto) => {
        if (response?.fileContent) {
          const source = `data:image/jpg;base64,${response.fileContent}`;
          this.imageData = source;
        }
      });
  }

  constructor(private attachmentService: AttachmentsService) {}
}
