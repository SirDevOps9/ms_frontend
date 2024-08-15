import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  invalidFileType: boolean = false;
  ngOnInit(): void {}

  @Output() fileData: EventEmitter<any> = new EventEmitter();
  imagesExtensions: string[] = ['image/png', 'image/jpeg'];

  private _imageSrcs: any = [];

  public get imageSrcs(): any[] {
    return this._imageSrcs;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent | any) {
    event.preventDefault();
    // const files = event.dataTransfer.files;
    // if (files.length > 0) {
    //   for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       this._imageSrcs.push(reader.result);
    //     };
    //   }
    // }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        if (!this.imagesExtensions.includes(file.type)) {
          this.invalidFileType = true;
        } else {
          this.invalidFileType = false;
        }
        reader.readAsDataURL(file);
        reader.onload = () => {
          const { result } = reader;
            this._imageSrcs.push(result);
        };
      }
    }

  }

  processImage(imageData: any) {
    this._imageSrcs.push(imageData);

  }
}
