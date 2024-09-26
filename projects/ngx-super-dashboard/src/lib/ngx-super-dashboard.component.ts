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
 <div>

        <div *ngIf="dynamicForm.value.length != 0">
    <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit(dynamicForm.value)">
      <div class="row">
        <div class="form-group col-md-3" *ngFor="let field of dynamicFormFieldData; let i = index;">
          <select
            class="form-control m-1"
            formControlName="{{ field.formControlKey }} -------"
            id="{{ field.formControlKey }}"
            (change)="seletedValue($event)"
          >
            <option selected>Select {{field.formControlKey}}</option>
            
                <ng-container *ngIf="field.lovDataList && field.lovDataList.length > 0">
                 
                <ng-container *ngFor="let item of field.lovDataList">
                            <option [value]="item.value" >{{ item.name }}</option>
                </ng-container>
        </ng-container>
        
          </select>
        </div>
        
        <div class="col-md-12 text-center">
    <button class="btn btn-lg btn-secondary mt-4">Search</button>
  </div>
      </div>
    </form>
</div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles:[`
  
  
.card{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  min-width: 200px;
  border: 1px solid #d7d2d2;
  height: 200px;
  box-shadow: 0 2px 6px 0 #20212447;
}


.dashboard-container{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  height: 100%;
  margin: 1rem;
  gap: 0.5rem;
}

.grid-area-search{
  grid-column: 1/-1;
  text-align: center;
  align-items: center;
  border: 1px solid #20212447 ;
}

.grid-area-chartsm{
  grid-column: 4/-1;
  grid-row: 2/4;
  color:black;
  text-align: center;
  min-height: 40%;
  
}


.grid-area-chartlg{

  grid-column: 3/4;
  border: 1px solid #20212447 ;
}

.grid-area-card{

  grid-column: 1/3;
  grid-row-start:2;
  margin: 0 auto;
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

export const DynamicFieldsConfiguration: DynamicFieldsData[] = [
  { lable: "Zone", formControlKey: "zone", lovDataList: [] },
  { lable: "Branch", formControlKey: "branch", lovDataList: [] },
  { lable: "Teams", formControlKey: "teams", lovDataList: [] },
  { lable: "Team Members", formControlKey: "teamMembers", lovDataList: [] },
 
];

export interface AppLOVData {
  name: string | number;
  value: string | number;
}

export interface DynamicFieldsData {
  lable: string;
  formControlKey: string;
  lovDataList: AppLOVData[];
}

export interface SelectedFieldValueEmit {
  selectedValue: string | number;
  fieldControlName: string;
}

export interface SetDataOption {
  fetchLovData: Record<string, string | number | any | null>[];
  optCode?: string | number;
  optDesc?: string;
  optDesc2?: string;
}
