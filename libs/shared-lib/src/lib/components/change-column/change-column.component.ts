import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'lib-change-column',
  templateUrl: './change-column.component.html',
  styleUrl: './change-column.component.css',
})
export class ChangeColumnComponent implements OnChanges {
  columnsList: any = [];
  @Input() dataTable: any = [];
  constructor(private generalService: GeneralService) {
    this.generalService.sendColumnsObs.subscribe((res) => {
      if (res) {
        let data = this.transformArray(res);
        res = res.map((elem: any, i: number) => {
          return {
            name: data[i],
            value: elem,
          };
        });

        this.columnsList = res;
      }
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    // let data : any = this.dataTable.filter((elem : any)=>!elem.id)
    // console.log(data);


  }

  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Function to convert camelCase to Title Case
  camelCaseToTitleCase(string: string) {
    // Split the string at each uppercase letter
    const words = string.replace(/([A-Z])/g, ' $1').split(' ');
    // Capitalize the first letter of each word
    return words.map((word) => this.capitalize(word)).join(' ');
  }

  // Function to transform the array
  transformArray(array: any) {
    return array.map((item: any) => this.camelCaseToTitleCase(item));
  }
}
