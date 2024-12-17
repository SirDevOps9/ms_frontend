import { Component } from '@angular/core';
import { SalesService } from '../../../sales.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, SharedLibraryEnums } from 'shared-lib';

@Component({
  selector: 'app-view-price-policy',
  templateUrl: './view-price-policy.component.html',
  styleUrl: './view-price-policy.component.scss'
})
export class ViewPricePolicyComponent {
  item:any
  selectedLanguage: string
  
  ngOnInit() {
    const id =this.router.snapshot.params['id']
    this.salesService.viewPricePolicy(id)
     this.subscribes()
    
   }
   subscribes(){
     this.languageService.language$.subscribe((lang)=>[
      this.selectedLanguage=lang
     ])
    this.salesService.itemPricePolicyObser.subscribe((res)=>{
this.item=res
})
   }
   constructor(
    private salesService: SalesService,    
    private router: ActivatedRoute,
    private languageService:LanguageService,
    public sharedLib: SharedLibraryEnums,
  ) { }
}
