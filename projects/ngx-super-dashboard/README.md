# NgxSuperDashboard

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Sample Program using Ngx-super-dashboard

## component.html 

<lib-ngx-super-dashboard
[dynamicFormFieldData]="searchFormFields"
 > 

</lib-ngx-super-dashboard>

## component.ts 

searchFormFields : DynamicFieldsData[] =  [
  { lable: "Zone", formControlKey: "zone", lovDataList: [{name:'chennai',value:1},{name:'trichy',value:2}] },
  { lable: "Branch", formControlKey: "branch", lovDataList: [] },
  { lable: "Teams", formControlKey: "teams", lovDataList: [] },
  { lable: "Team Members", formControlKey: "teamMembers", lovDataList: [] },
 
];

## type definition 


export interface AppLOVData {
  name: string | number;
  value: string | number;
}

export interface DynamicFieldsData {
  lable: string;
  formControlKey: string;
  lovDataList: AppLOVData[];
}
