import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Modules } from 'shared-lib';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  moduleName: string;

  ngOnInit() {

    if (this.router.snapshot.data['moduleId'] === Modules.Accounting)
      this.moduleName = 'Accounting';
    else if (this.router.snapshot.data['moduleId'] === Modules.Hr) this.moduleName = 'Hr';
    else if (this.router.snapshot.data['moduleId'] === Modules.Finance) this.moduleName = 'Finance';
    else if (this.router.snapshot.data['moduleId'] === Modules.Sales) this.moduleName = 'Sales';
    else if (this.router.snapshot.data['moduleId'] === Modules.Purchase) this.moduleName = 'Purchase';
    else if (this.router.snapshot.data['moduleId'] === Modules.GeneralSettings)
      this.moduleName = 'General Settings';

    this.titleService.setTitle(this.moduleName);
  }

  constructor(private router: ActivatedRoute, private titleService: Title) {}
}
