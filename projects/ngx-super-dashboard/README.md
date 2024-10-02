# NgxSuperDashboard

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Sample Program using Ngx-super-dashboard

## component.html

<lib-ngx-super-dashboard
[dynamicFormFieldData]="searchFormFields"
(onSelect)="onSelected($event)"
    (onSubmit)="onSearchSubmit($event)"
[cardConfig]="countCardsListData"
[chartsConfig]="dashboardChartConfig"
(onSelectChart)="selectedChart($event)"
[gridOneConfig]="cardTableData"
[gridTwoConfig]="gridTableData"

>

</lib-ngx-super-dashboard>

## component.ts

searchFormFields : DynamicFieldsData[] = [
{ lable: "Zone", formControlKey: "zone", lovDataList: [{name:'chennai',value:1},{name:'trichy',value:2}] },
{ lable: "Branch", formControlKey: "branch", lovDataList: [] },
{ lable: "Teams", formControlKey: "teams", lovDataList: [] },
{ lable: "Team Members", formControlKey: "teamMembers", lovDataList: [] },
{ lable: "Start Date", formControlKey: "startdate", type: "date", className:'fieldstyle' },

];

example:This is for left side grid cards section

countCardsListData:DynamicCardsData = DynamicCountCardsConfiguration([
{ title: "Total Proposals", subTitle:"", value: 700, className:""},
{ title: "On Process", value: 230 },
{ title: "Sanctioned", value: 300 },
{ title: "Rejected", value: 254 },
{ title: "Opened prending for > 30 days", value: 143 },
{ title: "Disbursed", value: 120, className:'gridCard' },
])

export const dashboardChartConfig:DashardCardConfig = [
{type: columnChart,
cardTitle: 'Monthly Wise',
chartOptionData: columnChartOptions,
chartData: columnchartData,
className:""
},
{type: pieChart,
cardTitle: 'Total Sanctioned',
chartOptionData: pieChartOptions,
chartData: piechartData,
className:""
},
]

gridOneConfig: it is a input for small card table array data

example:

export const cardTableData:CardTableDataConfig ={
cardTitle: '',
tableHeadings:['So.no', 'retail', 'agri', 'msme', 'gold'],
tableDataKey:['key1', 'key2'],
tableData: [{}],
className: ''
}

gridTwoConfig: it is a input for small card table array data

example:

export const gridTableData: GridTableConfigData = {
title:'Schemem',
tableHeadings: ['loanType', 'scheme', ''],
tableDataKey:['key1', 'key2', 'key3'],
tableData: {car: [], Cash: []},
className: ""
}

## Event Emitters

onSelect --- Selected Search Field Data emit with field form control name
onSubmit --- On Submit Form Data
onSelectChart -- Click on chart, it emit events and chartType

## type definition

export interface SelectedFieldValueEmit {
selectedValue: string | number;
fieldControlName: string;
}

export interface SelectChartType{
ev:any;
chartType:string
}

export interface AppLOVData {
name: string | number;
value: string | number;
}

export interface DynamicFieldsData {
lable: string;
formControlKey: string;
lovDataList: AppLOVData[];
className:string;
}

export interface DynamicCardsData {
title: string;
value: string | number | null;
className?: string;
}

export interface CardTableDataConfig {
cardTitle:string;
tableHeadings: string[];
tableDataKey:string[];
tableData: any[];
className?: string;
}

export interface GridTableConfigData{
title:string;
tableHeadings: string[];
tableDataKey:string[];
tableData: any | object;
className?:string;
}
