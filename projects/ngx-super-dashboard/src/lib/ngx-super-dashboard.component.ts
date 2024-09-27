import { CommonModule, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
@Component({
  selector: 'lib-ngx-super-dashboard',
  template:`
  <div class="fields-bar">
  <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit(dynamicForm.value)">
    <div class="grid-label-bar" *ngIf="dynamicForm.value.length != 0">
        
       
        
        
          <ng-container *ngFor="let field of dynamicFormFieldData;let i = index;">
          

      <div class="list" *ngIf="field.lovDataList && field.lovDataList.length > 0; else dynamicNonDropdown">
        <div class="lable">{{ field.lable }}<span>-</span></div>

        <select
          formControlName="{{ field.formControlKey }}"
          id="{{ field.formControlKey }}"
          (change)="seletedValue($event)"
          placeholder="Select"
        >
          <option selected value="">Select</option>
          <option [value]="item.value" *ngFor="let item of field.lovDataList;">{{ item.name }}</option>
          
        </select>
       
      </div>
      
      
    <ng-template #dynamicNonDropdown>
      <div class="list">
        <div class="lable">{{ field.lable }}<span>-</span></div>
        <input
          type="{{ field.type }}"
          class="picker"
          formControlName="{{ field.formControlKey }}"
          id="{{ field.formControlKey }}"
          (change)="seletedValue($event)"
          placeholder="Select"
        />
      </div>
    </ng-template>
     
    </ng-container>

      <div class="list lastList">
        <div class="lable">
          *Accounts in Actuals <br />
          *Ammount in Lakhs
        </div>
      </div>
    </div>
  </form>
</div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles:[`

  .fields-bar {
    width:100vw;
    position:fixed;
    top:0;
    z-index:999;
    background-color: #111249;
    display: flex;
  }
  .grid-label-bar {
    grid-template-columns: auto auto auto auto auto auto auto;
    gap: 10px;
    padding: 5px 14px;
    display: grid;
    color: #fff;
    font-size: 13px;
   
  }

  .grid-label-bar .list {
    display: flex;
    align-items: center;
  }

  .lable span {
      margin-left: 6px;
   }
  
  
  
  input.picker[type="date"] {
    position: relative;
  }
  
  input.picker[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    color: transparent;
    background: transparent;
  }
  
  select,
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: none;
    color: #fff;
    width: 118px;
    padding: 0 6px;
  }
  select::-ms-expand {
    display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
  }
  select:focus-visible {
    outline: none;
  }
  
  input::placeholder {
    color: #fff;
    opacity: 1; /* Firefox */
  }
  option {
    background-color: #fff;
    color: #000;
  }
  
  @media (max-width: 1089px) {
    .grid-label-bar .lastList {
      display: none;
    }
  }
  
  @media (max-width: 786px) {
    .grid-label-bar {
      grid-template-columns: auto auto auto;
    }
  }
  @media (max-width: 580px) {
    .grid-label-bar {
      grid-template-columns: auto auto;
    }
  }
  
  `]
})
export class NgxSuperDashboardComponent {

  dynamicForm!: FormGroup;
  @Input({required:true})
  dynamicFormFieldData!: DynamicFieldsData[];

  @Output() selectedField = new EventEmitter<SelectedFieldValueEmit>();
  @Output() onSubmitForm = new EventEmitter(); 


  constructor(
    private fb: FormBuilder,
  ) {
    console.log(`NgxSuperDashboardComponent : constructor`)
  }

  ngOnInit() {
    //create dynamic fields and add validation for each field
    console.log(`NgxSuperDashboardComponent : ngOnInit`)

    this.createForm();
  }
  createForm() {
    let formGrp = {};
    this.dynamicFormFieldData.forEach((field: DynamicFieldsData) => {
      formGrp = {
        ...formGrp,
        [field.formControlKey]: ["", Validators.compose([Validators.required])],
      };
    });
    this.dynamicForm = this.fb.group(formGrp);
  }

  // emit selected field value
  seletedValue(ev: any) {
    this.selectedField.emit({
      selectedValue: ev.target.value,
      fieldControlName: ev.target.id,
    });
  }

  onSubmit(formValues: FormGroup) {
    this.onSubmitForm.emit(formValues);
  }

}
export const DynamicFieldsConfiguration  = (fieldConfig:DynamicFieldsData[]):DynamicFieldsData[] => {
  if(fieldConfig)
    return fieldConfig
  else 
    return testFieldData
}


export const testFieldData:DynamicFieldsData[] = [
{ lable: "Zone", formControlKey: "zone", lovDataList: [] },
{ lable: "Branch", formControlKey: "branch", lovDataList: [] },
{ lable: "Teams", formControlKey: "teams", lovDataList: [] },
{ lable: "Product", formControlKey: "product", lovDataList: [] },
{ lable: "Start Date", formControlKey: "startDate", type: "date" },
{ lable: "End Date", formControlKey: "endDate", type: "date" },
];

export interface AppLOVData {
name: string | number;
value: string | number;
}

export interface DynamicFieldsData {
lable: string;
formControlKey: string;
lovDataList?: AppLOVData[];
type?: string;
}

export interface SelectedFieldValueEmit {
selectedValue: string | number;
fieldControlName: string;
}

export interface SetDataOption {
fetchLovData: Record<string, string | number | any | null>[];
value?: string | number;
name?: string;
optDesc2?: string;
}
