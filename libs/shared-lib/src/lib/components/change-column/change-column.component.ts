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
  @Input() placeholder: string = 'Change Column'; 
  @Input() labelTest: any = 'micro-button';

  constructor(private generalService: GeneralService) {
    this.generalService.sendColumnsObs.subscribe((res) => {
      console.log(res)

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

  columnsSelected(event : any) {

    //  console.log(event)
    //  console.log(this.dataTable)
    // let data : any = this.dataTable.filter((elem : any , i : number)=>event[i] == elem)
    // console.log(data);

 
  if(event) {
    console.log(this.filterProperties(this.dataTable , event))  
    this.generalService.sendFilteredList.next(this.filterProperties(this.dataTable , event))
    this.generalService.sendSelectedColumns.next(event)

  }
    

  }

   filterProperties = <T extends { id: number }, K extends keyof T>(array: T[], properties: K[]): Partial<T>[] => {
    return array.map(item => {
      const result : any = { id: item.id };
      properties.forEach(property => {
        if (item.hasOwnProperty(property)) {
          result[property] = item[property];
        }
      });
      return result;
    });
  };
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.dataTable)
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

  ngAfterViewInit() {
    if (this.placeholder) {
      setTimeout(() => {
        this.labelTest = this.placeholder;
      }, 500);
    }
  }

        
}
