import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemsService } from '../../../../items.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-attribute-definition-list-values',
  templateUrl: './attribute-definition-list-values.component.html',
  styleUrl: './attribute-definition-list-values.component.scss'
})
export class AttributeDefinitionListValuesComponent {
  shouldShowNameEn: boolean = false;
  _routeid:number
  constructor(
  private itemsService :ItemsService,
  private _route: ActivatedRoute,

  ) {}

  attributeValues: any={};
  attributeValuesList: any[]=[];


  ngOnInit() {
    this._routeid = this._route.snapshot.params['id'];


    this.attributeGroupsValue(this._routeid)

  }

  attributeGroupsValue(id: number) {
    this.itemsService.attributeGroupsValue(id);
    this.itemsService.attributeValuesDropDownLookupObs.subscribe((res: any) => {
      this.attributeValues = res;
      this.attributeValuesList = res
      console.log(this.attributeValuesList);


    });
  }


}
