# NgxSuperDashboard

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Sample Program using Ngx-super-dashboard

## component.html

lib-ngx-super-dashboard is a combination of search form fields and angular-google-charts module 

various filters like dropdown filters , date picker can be configured with dynamicFormFieldData input prop

onSelect and onSbmit eventemitters are provided to return the selected value of dropdown and form object 

eg : when zone dropdown selected onSelect event emitter will return  object of type SelectedFieldValueEmit

onSelect(a:SelectedFieldValueEmit){


}

onSubmit(e:Record<string, string | number){


}

Usage of the component . 
```
<lib-ngx-super-dashboard

[dynamicFormFieldData]="searchFormFields"

(onSelect)="onSelected($event)"

(onSubmit)="onSearchSubmit($event)"

[cardConfig]="testCardData"

[chartsConfig]="testChartsData"

(onSelectChart)="selectedChart($event)"

[gridOneConfig]="testCardTable"

[gridTwoConfig]="testGridTable"

>

</lib-ngx-super-dashboard>
```

Input Properties

## component.ts

Sample data of dynamicFormFieldData to configure dynamic search form


```
searchFormFields: DynamicFieldsData[] = [
  {
    label: "Zone",
    formControlKey: "zone",
    lovDataList: [
      { name: 'Chennai', value: 1 },
      { name: 'Trichy', value: 2 }
    ]
  },
  {
    label: "Branch",
    formControlKey: "branch",
    lovDataList: []
  },
  {
    label: "Teams",
    formControlKey: "teams",
    lovDataList: []
  },
  {
    label: "Team Members",
    formControlKey: "teamMembers",
    lovDataList: []
  },
  {
    label: "Start Date",
    formControlKey: "startdate",
    type: "date",
    className: 'fieldstyle'
  }
];
```
## 2. Cards Configuration 

Cards are configured using cardConfig input property . cardConfig takes array of DynamicCardData type

sample data
```
searchFormFields: DynamicFieldsData[] = [
  {
    label:       "Zone",
    formControlKey: "zone",
    lovDataList: [
      { name: 'Chennai', value: 1 },
      { name: 'Trichy', value: 2 }
    ]
  },
  {
    label:       "Branch",
    formControlKey: "branch",
    lovDataList: []
  },
  {
    label:       "Teams",
    formControlKey: "teams",
    lovDataList: []
  },
  {
    label:       "Team Members",
    formControlKey: "teamMembers",
    lovDataList: []
  },
  {
    label:       "Start Date",
    formControlKey: "startdate",
    type:        "date",
    className:   'fieldstyle'
  }
];

```

## 3. Dashboard Configuration 

Charts  are configured using chartsConfig input property . chartsConfig takes array of DashardCardConfig type

Sample chartConfig Data below 

```
export const testChartsData: DashboardCardConfig[] = [
  {
    type: ChartType.ComboChart,
    cardTitle: 'Monthly Wise',
    chartOptionData: {
      myColumns: [
        'Year',
        'Retail',
        'Agri',
        'MSME',
        'Gold',
        'Corp'
      ],
      chartOptions: {
        title: `Monthly Wise`,
        chartArea: { width: '50%' },
        hAxis: {
          title: `Modules`,
          minValue: 0
        },
        vAxis: {
          title: 'No. Of Amount'
        },
        seriesType: 'bars'
        // series: { 4: { type: "line" } }
      }
    },
    chartData: [
      ['2023/05', 50, 33, 24.5, 33, 22],
      ['2024/05', 23, 41, 22.5, 22, 2],
      ['2021/05', 44, 82, 13, 43, 12],
      ['2023/05', 19, 33, 23, 21, 89],
      ['2022/05', 30, 20, 12, 34, 22]
    ],
    className: ''
  },
  {
    type: ChartType.PieChart,
    cardTitle: 'Total Sanctioned',
    chartOptionData: {
      myColumns: [
        ['Retail', 'Agri', 'MSME', 'GOLD', 'CORP'],
        'Leads Count',
        { role: 'style' }
      ],
      chartOptions: {
        title: `Sanctioned Amount`,
        chartArea: { width: '50%' },
        slices: {
          0: { color: '#622248' },
          1: { color: '#109618' },
          2: { color: '#3366cc' },
          3: { color: 'red' },
          4: { color: '#ff9900' }
        }
      }
    },
    chartData: [
      ['Retail', 3445, 'red'],
      ['Agri', 3445, 'red'],
      ['MSME', 3445, 'red'],
      ['Gold', 3445, 'red']
    ],
    className: ''
  }
];



```

## 4. Grids Configuration 

design dynamic grid component using gridOneConfig and gridTwoConfig input properties 


gridOneConfig: it is a input for small card table array data

example:

```
export const testCardTable = {
    cardTitle: 'Top 5 Branches',
    tableColumnHeadings: ['', 'Retail', 'Agri', 'MSME', 'Gold'],
    tableDataKey: ['orgName', 'retail', 'agri', 'msme', 'gold'],
    tableData: [
            {
              orgName: 'Chennai',
              retail: '849',
              agri: '599',
              msme: '500',
              gold: '200',
            },
            {
              orgName: 'Delhi',
              retail: '200',
              agri: '300',
              msme: '400',
              gold: '150',
            },
            {
              orgName: 'Tnagar',
              retail: '849',
              agri: '480',
              msme: '250',
              gold: '600',
            },
            {
              orgName: 'Poonamale',
              retail: '940',
              agri: '234',
              msme: '700',
              gold: '400',
            },
          ],
        };

```

gridTwoConfig: it is a input for large card table array data

example:

```
export const testGridTable: GridTableConfigData = {
  title: 'Scheme Wise',
  tableHeading: [
      'Loan Type',
      'Scheme',
      'No of Acc #',
      'Limit in (Lakhs)',
      'OS amt in(Lakhs)',
],
  tableData: [
      {
        parentName: 'Chennai',
        childData: [
            {
              tpmSeqId: 62685,
              tpmCode: '2',
              tpmModifiedDate: '2024-04-24T07:49:20.879+0000',
              tpmPrdCode: 'Car Loan',
              schemeType: 'Car Dealer',
              noOfAcc: 'S14',
              limit: '344',
              Sanctioned: '20302',
            },
          ],
        },
    {
      parentName: 'Hyderabad',
      childData: [
          {
              tpmSeqId: 62686,
              tpmCode: '2',
              tpmModifiedDate: '2024-04-24T07:49:20.880+0000',
              tpmPrdCode: 'Cash Loan',
              schemeType: 'Property Loan',
              noOfAcc: 'S34',
              limit: '676',
              Sanctioned: '23',
          },
      ],
    },
  ],
    tableDataKey: ['schemeType', 'noOfAcc', 'limit', 'Sanctioned'],
};
```
## Event Emitters

onSelect --- Selected Search Field Data emit with field form control name
onSubmit --- On Submit Form Data
onSelectChart -- Click on chart, it emit events and chartType

## type definition
```
export interface AppLOVData {
        name: string | number;
        value: string | number;
}

export interface DynamicFieldsData {
        lable: string;
        formControlKey: string;
        lovDataList?: AppLOVData[];
        type?: string;
        className?: string;   
}

export interface SelectedFieldValueEmit {
        selectedValue: string | number;
        fieldControlName: string;
}

export interface SetDataOption {
        fetchLovData: Record<string, string | number>[];
        value: string | number;
        name: string;
        name2?: string;
}
```
// interfaces for grid cardsList:
```

// Dynamic Card Data Interface
export interface DynamicCardsData {
  title: string;
  value: number | string;
  className?: string;
}

// Dashboard Card Configuration Interface
export interface DashboardCardConfig {
  type: any;
  chartOptionData: ChartOptionsConfig;
  chartData: Array<ChartDataType[]>;
  cardTitle?: string;
  className?: string;
}

// Chart Data Type
export type ChartDataType = string | number;

// Chart Options Configuration Interface
export interface ChartOptionsConfig {
  myColumns: Array<string | ColumnsType[] | string | Record<string, string | number>>;
  chartOptions: ChartAxisData;
}

// Columns Data Type
export type ColumnsType = string | number;

// Chart Axis Data Interface
export interface ChartAxisData {
  title: string;
  chartArea: {
    width?: string | number;
    height?: string | number;
  };
  slices?: object;
  hAxis?: AxisValues;
  vAxis?: AxisValues;
  seriesType?: string;
  series?: object;
}

// Axis Values Interface
export interface AxisValues {
  title?: string;
  minValue?: number;
}

// Chart Event Emit On Select Interface
export interface ChartEventEmitOnSelect {
  ev: ChartSelectionChangedEvent;
  chartType: string;
}

// Card Table Data Configuration Interface
export interface CardTableDataConfig {
  cardTitle?: string;
  tableColumnHeadings: string[];
  tableDataKey: string[];
  tableData: Array<Record<string, string | number>>;
  className?: string;
}

// Grid Table Configuration Data Interface
export interface GridTableConfigData {
  title?: string;
  tableHeading: string[];
  tableDataKey: string[];
  tableData: Array<Record<string, string | number | []>>;
  className?: string;
}

// Child Data Type
export type ChildDataType = string | number;
```
