import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../items.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { itemAttributeValues } from '../../models/itemAttributeValues';

@Component({
  selector: 'app-view-variant-popup',
  templateUrl: './view-variant-popup.component.html',
  styleUrl: './view-variant-popup.component.scss'
})
export class ViewVariantPopupComponent implements OnInit {
  attributeValues : any[] = []
  constructor(private itemsService : ItemsService , private config : DynamicDialogConfig , private ref : DynamicDialogRef){}
  ngOnInit(): void {
    console.log(this.config.data)

    this.itemsService.attributeGroupsValuesData(this.config.data)
    this.itemsService.attributeValuesDataObs.subscribe(res=>{
      console.log(res)
      this.attributeValues = res
    })

  }

  close() {
    this.ref.close()
  }

}
