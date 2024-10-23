import { Component, OnInit } from '@angular/core';
import { LanguageService, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-UOM-main',
  templateUrl: './UOM-main.component.html',
  styleUrls: ['./UOM-main.component.css']
})
export class UOMMainComponent implements OnInit {

  constructor(    private title: Title,
    private langService: LanguageService,) {


   }

  ngOnInit() {
  }

}
