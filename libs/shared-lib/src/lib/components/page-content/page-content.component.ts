import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'lib-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
})
export class PageContentComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    //this.titleService.setTitle(this.title + ' | ' + this.subTitle);
  }
}
