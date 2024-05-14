import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-chart-of-account-tree',
  templateUrl: './chart-of-account-tree.component.html',
  styleUrl: './chart-of-account-tree.component.scss'
})
export class ChartOfAccountTreeComponent implements OnInit {
  
  // nodes: TreeNode[];
  nodes: any[];
  data: any[];
  expanded:boolean=false;
  ngOnInit() {
    this.data=[
      {
        "id": 1,
        "nameAr": " الأصول",
        "nameEn": "assets",
        "accountCode": "1",
        "parentId": null,
        "levelId": 1,
        "childrens": []
      },
      {
        "id": 2,
        "nameAr": "الأصول طويلة الأجل ",
        "nameEn": "The assets are long-term",
        "accountCode": "11",
        "parentId": null,
        "levelId": 1,
        "childrens": [
          {
            "id": 3,
            "nameAr": "الأصول الثابتة  بالصافي ",
            "nameEn": "Fixed assets",
            "accountCode": "111",
            "parentId": 2,
            "levelId": 2,
            "childrens": [
              {
                "id": 4,
                "nameAr": "اراضى رئيسى",
                "nameEn": "Lands",
                "accountCode": "11101",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 5,
                    "nameAr": "اراضى",
                    "nameEn": null,
                    "accountCode": "111011",
                    "parentId": 4,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 6,
                "nameAr": "مبانى وانشاءات رئيسى",
                "nameEn": "Buildings",
                "accountCode": "11102",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 7,
                    "nameAr": "مبانى وانشاءات",
                    "nameEn": null,
                    "accountCode": "111021",
                    "parentId": 6,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 8,
                "nameAr": "اجهزه كهربائيه رئيسى",
                "nameEn": "electric machines",
                "accountCode": "11103",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 9,
                    "nameAr": "اجهزه كهربائيه ",
                    "nameEn": null,
                    "accountCode": "111031",
                    "parentId": 8,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 10,
                "nameAr": "الات ومعدات رئيسى",
                "nameEn": "Machinery and equipment",
                "accountCode": "11104",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 11,
                    "nameAr": "الات ومعدات وخطوط انتاج ",
                    "nameEn": null,
                    "accountCode": "111041",
                    "parentId": 10,
                    "levelId": 4,
                    "childrens": [
                      {
                        "id": 13,
                        "nameAr": "عدد وادوات ",
                        "nameEn": null,
                        "accountCode": "111051",
                        "parentId": 11,
                        "levelId": 4,
                        "childrens": []
                      }
                    ]
                  }
                ]
              },
              {
                "id": 12,
                "nameAr": "عدد و ادوات رئيسى",
                "nameEn": "tools",
                "accountCode": "11105",
                "parentId": 3,
                "levelId": 3,
                "childrens": []
              },
              {
                "id": 14,
                "nameAr": "اجهزه حاسب الى رئيسى ",
                "nameEn": "computers",
                "accountCode": "11106",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 15,
                    "nameAr": "اجهزه حاسب الى وشبكات ",
                    "nameEn": null,
                    "accountCode": "111061",
                    "parentId": 14,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 16,
                "nameAr": "اثاث ومفروشات رئيسى",
                "nameEn": "furniture",
                "accountCode": "11107",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 17,
                    "nameAr": "اثاث ومفروشات ",
                    "nameEn": null,
                    "accountCode": "111071",
                    "parentId": 16,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 18,
                "nameAr": "غرف تبريد رئيسى",
                "nameEn": "Refrigerators",
                "accountCode": "11108",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 19,
                    "nameAr": "غرف تبريد وتجميد ",
                    "nameEn": null,
                    "accountCode": "111081",
                    "parentId": 18,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 20,
                "nameAr": "وسائل نقل وانتقال رئيسى",
                "nameEn": "cars",
                "accountCode": "11109",
                "parentId": 3,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 21,
                    "nameAr": "وسائل نقل وانتقالات ",
                    "nameEn": null,
                    "accountCode": "111091",
                    "parentId": 20,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              }
            ]
          },
          {
            "id": 22,
            "nameAr": "مشروعات تحت التنفيذ",
            "nameEn": "Projects under implementation",
            "accountCode": "112",
            "parentId": 2,
            "levelId": 2,
            "childrens": [
              {
                "id": 23,
                "nameAr": "مشروعات تحت التنفيذ ارض الشاطى رئيسى",
                "nameEn": null,
                "accountCode": "11201",
                "parentId": 22,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 24,
                    "nameAr": "مشروعات تحت التنغيذ ارض الشاطىء",
                    "nameEn": null,
                    "accountCode": "112011",
                    "parentId": 23,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 25,
                "nameAr": "مشروعات تحت التنفيذ عماره الامير متعب رئيسى",
                "nameEn": null,
                "accountCode": "11202",
                "parentId": 22,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 26,
                    "nameAr": "مشروعات تحت التنفيذ الامير متعب",
                    "nameEn": null,
                    "accountCode": "112021",
                    "parentId": 25,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              },
              {
                "id": 27,
                "nameAr": "مشروعات تحت التنفيذ معرض الكورنيش رئيسى",
                "nameEn": null,
                "accountCode": "11203",
                "parentId": 22,
                "levelId": 3,
                "childrens": [
                  {
                    "id": 28,
                    "nameAr": "مبانى وانشاءات فرع الكورنيش ",
                    "nameEn": null,
                    "accountCode": "112031",
                    "parentId": 27,
                    "levelId": 4,
                    "childrens": []
                  },
                  {
                    "id": 29,
                    "nameAr": "الات ومعدات فرع الكورنيش ",
                    "nameEn": null,
                    "accountCode": "112032",
                    "parentId": 27,
                    "levelId": 4,
                    "childrens": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
    // this.nodes=
    // [
    //   {
    //     "label": "Parent 1",
    //     "children": [
    //       { 
    //         "label": "Child 1.1" ,
    //         "children": [
    //           { 
    //             "label": "Child 1.1.1" 
    //           },
    //           { "label": "Child 1.1.2" }
    //         ]
    //       },
    //       { "label": "Child 1.2" }
    //     ]
    //   },
    //   {
    //     "label": "Parent 2",
    //     "children": [
    //       { "label": "Child 2.1" },
    //       { "label": "Child 2.2" }
    //     ]
    //   }
    // ]
    this.nodes =this.mapToTreeNodes(this.data)
  }
  mapToTreeNodes(data: any[]) {
    data =data.map(item=>{
     return{
      label: item.nameEn, // Assuming you want to display the English label
      children:item.childrens?this.mapToTreeNodes(item.childrens) : [] 
     }
    }) 
    return data
}
  addChild(parentNode: TreeNode) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push({ label: 'New Child Node' });
  }
  // toggleNode(node: any) {
  //   node.expanded = !node.expanded;
  // }
  handleTabClick(node:any){
    console.log(node);
    
  }

}
