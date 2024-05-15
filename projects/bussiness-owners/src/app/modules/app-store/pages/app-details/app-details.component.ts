import { AppStoreProxy } from './../../app-store.proxy';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDto } from '../../models/appDto';
import { AttachmentsService, BaseDto, EnvironmentService, SubdomainService } from 'shared-lib';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { AppStoreService } from '../../app-store.service';
import { ResponseSubdomainDto } from '../../../subscription/models';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrl: './app-details.component.scss'
})
export class AppDetailsComponent implements OnInit {
  cover: string;
  activeIndex = 0;
  id: number;
  app: AppDto;
  subdomains: ResponseSubdomainDto[];

  constructor(route: ActivatedRoute,
    private attachmentService: AttachmentsService,
    private dialog: DialogService,
    private appStoreService: AppStoreService,
    private subdomainService: SubdomainService,
    private appStoreProxy: AppStoreProxy) {
    this.id = route.snapshot.params['id']

  }

  ngOnInit(): void {
    
    this.appStoreProxy.getById(this.id).subscribe(r => {
      r.appGallery = [ ...r.appGallery!];
      this.app = r;
      this.cover = r.appGallery[0];
    });
    this.subdomainService.getAllSubdomains().subscribe(s => this.subdomains = s);
  }

  addToCart() {
    this.appStoreService.addToCart(this.app.id, this.dialog, this.subdomains);
  }

  clickImg(photoId: string, index: number) {
    this.cover = photoId;
    this.activeIndex = index;
  }
}
