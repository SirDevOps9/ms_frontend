import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseDto, customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, Pages, ToasterService } from 'shared-lib';
import { SharedEnums } from '../models/shared-enum';
import { SequenceService } from '../sequence.service';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmSequenceComponent } from '../components/confirm-sequence/confirm-sequence.component';
Pages
@Component({
  selector: 'lib-sequence',
  templateUrl: './sequence.component.html',
  styleUrl: './sequence.component.scss'
})
export class SequenceComponent {
  moduleId: number;
  example: string ="XXXX_2024_08_0000";
  pageId: number;
  tableData: any[];
  columns: any[];                     
  sequenceDetails: FormArray
  sequence: FormGroup
  separatorOptions: { key: string, value: number }[] = [];
  segmentOptions: BaseDto[] = [];
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;
  originalPaymentMethodTypeLookups: lookupDto[] = [];
  allBranches:BaseDto[]
  allgetCompanys:BaseDto[]
  oldSequence:boolean=false
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private formsService: FormsService,
    public SharedEnums: SharedEnums,
    public lookupsService: LookupsService,
    public sequenceService: SequenceService,
    private toasterService : ToasterService ,
    private languageService : LanguageService ,
    private titleService: Title,
    private dialog: DialogService,



  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.languageService.transalte('sequence.sequence'));

     
    this.separatorOptions = this.SharedEnums.getSeparatorEntries();
   
    this.route.data.subscribe(data => {
      this.moduleId = data['moduleId'];
      this.pageId = data['pageId'];
    });
    this.initializeForm()
    this.loadLookups();
    this.supscrip();
    this.getSequence(this.pageId.toString())
    this.getBranch()
    this.getCompany()

  }

  initializeForm() {
    this.sequence = this.fb.group({
      status: new FormControl(true),
      companyId: new FormControl(),
      branchesIds: new FormControl('',customValidators.required),
      module: new FormControl(),
      screen: new FormControl(),
      type: new FormControl('Yearly'),

      sequenceDetails: this.fb.array([])
    })
    this.sequence.get('module')?.setValue(this.moduleId.toString())
    this.sequence.get('screen')?.setValue(this.pageId.toString())
    this.sequenceDetails = this.sequence.get('sequenceDetails') as FormArray;  // Assign the FormArray reference
    let newLine = this.fb.group({
      order: new FormControl(1),
      segment: new FormControl(1),
      detailValue: new FormControl(),
      valueOption: new FormControl(),
      segmentName: new FormControl(''),
      companyCode: new FormControl(""),
      branchCode: new FormControl(""),
      serialNumber: new FormControl(),
      separatorName: new FormControl(),
    });
    newLine.updateValueAndValidity();

  }
  addNewRow() {
    if (!this.formsService.validForm(this.sequenceDetails, false)) return;
    const id = this.sequenceDetails.length + 1;

    let newLine = this.fb.group(

      {
      order: new FormControl(id),
      segment: new FormControl(),
      detailValue: new FormControl(),
      valueOption: new FormControl(),
      segmentName: new FormControl(''),
      companyCode: new FormControl(),
      branchCode: new FormControl(),
      serialNumber: new FormControl(),
      separatorName: new FormControl(),


      }
    );

    newLine.updateValueAndValidity();
    this.sequenceDetails.push(newLine);
    this.updateOrderFields();

  }
  updateOrderFields() {
    this.sequenceDetails.controls.forEach((control, index) => {
      control.get('order')?.setValue(index + 1);  // Update 'order' to be 1-based index
    });
  }

  getSeparatorName(sequence: FormGroup) {
    if (sequence!.value?.detailValue) {
      let segemntId = sequence?.value.detailValue?.toString()

      const foundElement = this.lookups[LookupEnum.Separator].find(element => element.id == segemntId);
  
      if (foundElement) {
        sequence.get('separatorName')?.setValue(foundElement.name)
      }      
    }


  }

  supscrip() {
    this.sequenceDetails.valueChanges.subscribe((res)=>{
      this.sequenceDetails.controls.forEach((control, index) => {
      
        if (control) {
          control.get('segment')?.valueChanges.subscribe(value => {
            const targetControl = control.get('detailValue'); // Replace 'targetField' with the correct control name
            const valueOption = control.get('valueOption'); // Replace 'targetField' with the correct control name
            if (value == this.SharedEnums.Segments.Text) {
              targetControl?.setValue('')
              valueOption?.clearValidators();

              targetControl?.setValidators([customValidators.required, customValidators.length(1, 4) ]);
            } else if(value == this.SharedEnums.Segments.SerialNumber){
              
              targetControl?.clearValidators();
              targetControl?.setValidators([customValidators.required,customValidators.number ,customValidators.hasSpaces, customValidators.nonZero ]);
              valueOption?.setValidators([customValidators.required ,customValidators.number ,customValidators.hasSpaces ]);

              control.get('detailValue')?.valueChanges.subscribe(value => {
                const userInput =control.get('detailValue')?.value
                if (userInput !== null && userInput !== undefined) {
                  control.get('valueOption')?.setValue( '0'.repeat(userInput));
                  valueOption?.setValidators([customValidators.required,customValidators.length(userInput, userInput ) ,customValidators.number ,customValidators.hasSpaces]);

                }
              })
            }
            else if(value == this.SharedEnums.Segments.Year){

              targetControl?.clearValidators();
              valueOption?.clearValidators();

              control.get('detailValue')?.setValue("YYYY")
  
            }
            else if(value == this.SharedEnums.Segments.Month){
              targetControl?.clearValidators();
              valueOption?.clearValidators();

              control.get('detailValue')?.setValue("MM")
  
            }
            else if(value == this.SharedEnums.Segments.Day){
              targetControl?.clearValidators();
              valueOption?.clearValidators();

              control.get('detailValue')?.setValue("DD")
  
            }
            else if(value == this.SharedEnums.Segments.CompanyCode){
              targetControl?.clearValidators();
              valueOption?.clearValidators();

              control.get('detailValue')?.setValue(this.allgetCompanys[0].id)
  
            }
            else if(value == this.SharedEnums.Segments.BranchCode){
              targetControl?.clearValidators();
              valueOption?.clearValidators();  
              control.get('detailValue')?.setValue(this.allBranches[0].id)

            }else if(value == this.SharedEnums.Segments.Separator){
              targetControl?.clearValidators();
              valueOption?.clearValidators();

              targetControl?.setValidators([customValidators.required ]);
               this.getSeparatorName(control.value)

            }
            
            else {
              targetControl?.clearValidators();
            }
            targetControl?.updateValueAndValidity(); // Update the control after adding/removing validators
          });
        }
      });
      this.example =
      res.map((line:any) => {
        // Use `serialNumber` if it's selected, otherwise use `value`
       return  line.valueOption ||line.separatorName || line.detailValue;
      }).join('');  // No separ

    }
  )
 
    this.lookupsService.lookups.subscribe((l) => {
      this.lookups = l;      
    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Separator,
      LookupEnum.Segment,
      LookupEnum.SequenceType,
      LookupEnum.Module,
      LookupEnum.Screen,
    ]);
   
  }
  onRowReorder(event: any) {
    const { dragIndex, dropIndex } = event;
    
    // Remove the dragged item from its original position
    const [movedItem] = this.sequenceDetails.value.splice(dragIndex, 1);
    
    // Insert the moved item at the new position
    this.sequenceDetails.value.splice(dropIndex, 0, movedItem);

    // Update the order field based on the new index
    this.sequenceDetails.value.forEach((row:any, index:any) => {
      row.order = index + 1; // Ensure the order field is updated based on the new index
    });
    this.updateExample(this.sequenceDetails.value)
  }
    
  
  updateExample(res: any[]) {
    this.example = res
      .map((line: any) => {
        // Use serialNumber if it's selected, otherwise use separatorName or detailValue
        return line.valueOption || line.separatorName || line.detailValue;
      })
      .join('');
  }

getBranch() {
  this.sequenceService.getBranch().subscribe(
    (branches) => {
      if (branches) {
        this.allBranches = branches;
        // Ensure branchesIds is an array, even if there's only one branch ID
        this.sequence.get('branchesIds')?.setValue([this.allBranches[0]?.id]);
      }
    },
    (error) => {
    }
  );
}
getCompany(){
  this.sequenceService.getCompany().subscribe(
    (Company) => {
      this.allgetCompanys = Company      
       this.sequence.get('companyId')?.setValue(this.allgetCompanys[0].id)
    }
  );
}

 getSequence(screen: string) {
  this.sequenceService.getSequence(screen).subscribe(
    (sequence) => {
      if(sequence) {
        this.sequence.patchValue({
          status: sequence?.status,
          type: sequence?.type,
        });
        sequence.sequenceDetails.forEach((detail: any) => {
          let newLine = this.fb.group({
            order: new FormControl(detail.order),
            segment: new FormControl(detail.segment),
            detailValue: new FormControl(detail.detailValue),
            valueOption: new FormControl(detail.valueOption),
            segmentName: new FormControl(""),
            companyCode: new FormControl(""),
            branchCode: new FormControl(""),
            serialNumber: new FormControl(),
            separatorName: new FormControl(this.getSeparatorNameOfDetailValue(detail.detailValue))
          });
        
          // Apply Validators based on segment value
          this.applySegmentValidators(newLine);
        
          newLine.updateValueAndValidity(); // Trigger validation
          this.sequenceDetails.push(newLine);
          this.updateOrderFields();
        });
        
      }
    }
  );
}
applySegmentValidators(control: FormGroup) {
  
  const segmentValue = control.get('segment')?.value;
  const targetControl = control.get('detailValue');
  const valueOptionControl = control.get('valueOption');

  if (segmentValue === this.SharedEnums.Segments.Text) {
    valueOptionControl?.clearValidators();

    targetControl?.setValidators([customValidators.required, customValidators.length(1, 4)]);
  } else if (segmentValue === this.SharedEnums.Segments.SerialNumber) {
    valueOptionControl?.clearValidators();
    targetControl?.setValidators([customValidators.required, customValidators.number, customValidators.hasSpaces, customValidators.nonZero]);
    valueOptionControl?.setValidators([customValidators.required, customValidators.number, customValidators.hasSpaces]);
    setTimeout(() => {
      control.get('detailValue')?.valueChanges.subscribe(value => {
        const userInput =control.get('detailValue')?.value
        if (userInput !== null && userInput !== undefined) {
          control.get('valueOption')?.setValue( '0'.repeat(userInput));
          valueOptionControl?.setValidators([customValidators.required,customValidators.length(userInput, userInput ) ,customValidators.number ,customValidators.hasSpaces]);
  
        }
      })
    }, 2000);
    // control.get('detailValue')?.valueChanges.subscribe(value => {
    //   const userInput =control.get('detailValue')?.value
      // if (userInput !== null && userInput !== undefined) {
      //   control.get('valueOption')?.setValue( '0'.repeat(userInput));
      //   valueOptionControl?.setValidators([customValidators.required,customValidators.length(userInput, userInput ) ,customValidators.number ,customValidators.hasSpaces]);

      // }
    // })
  } else if (segmentValue === this.SharedEnums.Segments.Year) {
    targetControl?.setValue('YYYY');
    targetControl?.clearValidators();
    valueOptionControl?.clearValidators();
  }
  // Add similar blocks for Month, Day, CompanyCode, BranchCode, Separator, etc.

  targetControl?.updateValueAndValidity();
  valueOptionControl?.updateValueAndValidity();

  setTimeout(() => {
    if(this.sequence.valueChanges.subscribe((res)=>{
      this.oldSequence=true
    })){

    }
  }, 1000);
}

  getSeparatorNameOfDetailValue(separator:string){
    let segemntId =separator
    const foundElement:any = this.lookups[LookupEnum.Separator].find(element => element.id == segemntId);
    if (foundElement) {
      return foundElement.name
    }
  }
  save(){
    if (!this.formsService.validForm(this.sequence, false)) return;
  const hasSeparator = this.sequenceDetails.controls.some(control => {
    return control.get('segment')?.value === this.SharedEnums.Segments.SerialNumber;
  });

  if (!hasSeparator) {
    this.toasterService.showError(
      this.languageService.transalte('error'),
      this.languageService.transalte('sequence.addSerialnumber')
    );
   return; 
  }  
if(this.oldSequence ){
  const dialogRef = this.dialog.open(ConfirmSequenceComponent, {
    header: this.languageService.transalte("confirm.confirm"),
    width: '400px',
    height: '330px',
  });
  dialogRef.onClose.subscribe((res) => {
    if (res) {
          this.sequenceService.addSequence(this.sequence.value);

    }
  });
}else{  
    this.sequenceService.addSequence(this.sequence.value);
  
}
  }
  onDelete(sequencLine:any){    
    this.sequenceDetails.removeAt(sequencLine);
    this.updateOrderFields();
  }

}