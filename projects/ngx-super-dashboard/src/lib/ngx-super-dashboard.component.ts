import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChartSelectionChangedEvent, ChartType } from 'angular-google-charts';

declare const google: any;

@Component({
  selector: 'lib-ngx-super-dashboard',
  template: `
    <div class="fields-bar">
      <form
        [formGroup]="dynamicForm"
        (ngSubmit)="onSubmitForm(dynamicForm.value)"
      >
        <div class="grid-label-bar" *ngIf="dynamicForm.value.length != 0">
          <ng-container
            *ngFor="let field of dynamicFormFieldData; let i = index"
          >
            <div
              [ngClass]="field.className ? field.className + ' list' : 'list'"
              *ngIf="
                field.lovDataList && field.lovDataList.length > 0;
                else dynamicNonDropdown
              "
            >
              <div class="lable">{{ field.lable }}<span>-</span></div>

              <select
                formControlName="{{ field.formControlKey }}"
                id="{{ field.formControlKey }}"
                (change)="seletedValue($event)"
                placeholder="Select"
              >
                <option selected value="">Select</option>
                <option
                  [value]="item.value"
                  *ngFor="let item of field.lovDataList"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            <ng-template #dynamicNonDropdown>
              <div
                [ngClass]="field.className ? field.className + ' list' : 'list'"
              >
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

    <div class="grid-container">
      <div
        class="grid-area-countCards"
        *ngIf="cardConfig && cardConfig.length > 0"
      >
        <ng-container *ngFor="let item of cardConfig; let j = index">
          <div
            [ngClass]="
              item.className
                ? item.className + ' card card-border-left'
                : 'card card-border-left'
            "
          >
            <div class="card-header">
              <h3>{{ item.title }}</h3>
            </div>
            <div class="card-content">
              <p>{{ item.value }}</p>
            </div>
          </div>
        </ng-container>
      </div>

      <div
        [ngClass]="
          gridTwoConfig && gridTwoConfig !== null && gridTwoConfig !== undefined
            ? 'grid-area-chart'
            : 'grid-area-chart grid-area-expand'
        "
      >
        <ng-container *ngFor="let chart of chartsConfig">
          <div
            [ngClass]="
              chart.className
                ? chart.className + ' card card-border-bottom'
                : 'card card-border-bottom'
            "
          >
            <div class="card-header">
              <h3>{{ chart.cardTitle }}</h3>
            </div>
            <google-chart
              style="width: 100%; height: 100%"
              [type]="chart.type"
              [data]="chart.chartData"
              [columns]="chart.chartOptionData.myColumns"
              [options]="chart.chartOptionData.chartOptions"
              (select)="selectedChart($event, chart.type)"
            ></google-chart>
          </div>
        </ng-container>

        <ng-container
          *ngIf="
            gridOneConfig && gridOneConfig != null && gridOneConfig != undefined
          "
        >
          <div
            [ngClass]="
              gridOneConfig.className
                ? gridOneConfig.className + 'card card-border-bottom'
                : 'card card-border-bottom'
            "
          >
            <div class="card-header">
              <h3>{{ gridOneConfig.cardTitle }}</h3>
            </div>
            <div class="card-content">
              <table class="grid-table">
                <thead>
                  <th *ngFor="let head of gridOneConfig.tableColumnHeadings">
                    {{ head }}
                  </th>
                </thead>
                <tbody>
                  <ng-container *ngIf="gridOneConfig.tableData; else noData">
                    <tr
                      *ngFor="
                        let item of gridOneConfig.tableData;
                        let i = index
                      "
                    >
                      <td *ngFor="let val of gridOneConfig.tableDataKey">
                        {{ item[val] }}
                      </td>
                    </tr>
                  </ng-container>
                  <ng-template #noData>
                    <tr>
                      <td colspan="5">No Data</td>
                    </tr>
                  </ng-template>
                </tbody>
              </table>
            </div>
          </div>
        </ng-container>
      </div>
      <div
        class="grid-area-tableRecords"
        *ngIf="
          gridTwoConfig && gridTwoConfig !== null && gridTwoConfig !== undefined
        "
      >
        <div
          [ngClass]="
            gridTwoConfig.className
              ? gridTwoConfig.className + ' card card-border-top'
              : 'card card-border-top'
          "
        >
          <div class="card-header">
            <h3>{{ gridTwoConfig.title }}</h3>
          </div>
          <div class="card-content">
            <table class="grid-table">
              <thead>
                <th *ngFor="let head of gridTwoConfig.tableHeading">
                  {{ head }}
                </th>
              </thead>
              <ng-container
                *ngIf="typeCheck(gridTwoConfig.tableData); else arrayBody"
              >
                <tbody>
                  <ng-container
                    *ngFor="let loan of gridTwoConfig.tableData | keyvalue"
                  >
                    <tr>
                      <td>
                        {{ loan.key }}
                      </td>
                      <td colspan="5" class="colspan">
                        <tr *ngFor="let item of $any(loan).value">
                          <td *ngFor="let key of gridTwoConfig.tableDataKey">
                            {{ item[key] }}
                          </td>
                        </tr>
                      </td>
                    </tr>
                  </ng-container>
                </tbody>
              </ng-container>
              <ng-template #arrayBody>
                <tbody>
                  <ng-container *ngFor="let loan of gridTwoConfig.tableData">
                    <tr>
                      <td *ngFor="let item of gridTwoConfig.tableDataKey">
                        {{ loan[item] }}
                      </td>
                    </tr>
                  </ng-container>
                </tbody>
              </ng-template>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :root {
        --purple-color: #622248;
        --card-border-width: 8px;
      }
      .fields-bar {
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 999;
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

      input.picker[type='date'] {
        position: relative;
      }

      input.picker[type='date']::-webkit-calendar-picker-indicator {
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

      .grid-container {
        height: auto !important;
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-template-rows: auto auto auto;
        gap: 12px;
        background-color: #dddddd96;
        padding: 7px;
        margin-top: 3rem;
      }

      .card {
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        margin: 5px 0 12px 0;
        text-align: center;
        background-color: #fff;
        width: 18vw;
        border-radius: 8px;
      }

      .card .card-header {
        padding: 14px;
        border-bottom: 1px solid #ddd;
        background: none;
        font-weight: 600;
        font-size: 15px;
      }
      .card .card-content {
        padding: 14px;
      }
      .card h3 {
        font-size: 15px;
        margin: 0;
      }
      .card p {
        font-weight: 600;
        font-size: 15px;
        color: #853163;
      }

      .grid-area-countCards {
        grid-area: 1/1/2/2;
      }

      .grid-area-chart {
        grid-area: 1/2/3/4;
      }

      .grid-area-chart .card {
        width: 40vw;
        height: 39.5vh;
        padding-bottom: 8px;
      }

      .grid-area-tableRecords {
        grid-area: 1/4/3/-1;
      }

      .grid-area-tableRecords .card {
        overflow: auto;
        width: 100%;
        height: 100%;
      }
      .grid-area-tableRecords .card-content {
        padding: 12px 10px;
      }

      .grid-table {
        font-weight: 400;
        font-size: 12px;
        border-collapse: collapse;
        width: 100%;
        height: auto;
        overflow: auto;
        border: 1px solid #ddd;
      }

      .grid-table tr,
      .grid-table th {
        border-bottom: 1px solid #ddd;
        padding: 8px;
      }
      .grid-table .colspan tr:last-child {
        border: none;
      }
      .colspan td {
        width: 20%;
        padding: 8px;
      }

      .grid-table td:nth-child(1),
      .grid-table th:nth-child(1) {
        border-right: 1px solid #f2f2f2;
      }

      .grid-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
      }

      @media (max-width: 850px) {
        .grid-container {
          gap: 10px;
        }
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
        .card-header {
          font-size: 14px;
        }
        .grid-container {
          grid-template-columns: auto;
          grid-template-rows: auto;
          gap: 0px;
        }
        .grid-area-countCards,
        .grid-area-chart,
        .grid-area-tableRecords {
          grid-area: auto;
        }
        .grid-area-chart .card,
        .grid-area-countCards .card,
        .grid-area-tableRecords .card {
          width: 100%;
          height: auto;
        }
        .grid-area-countCards .card-content.chart {
          height: auto;
        }
      }
      .card-border-left {
        border-left-color: var(--purple-color);
        border-left-width: var(--card-border-width);
        border-left-style: solid;
      }
      .card-border-bottom {
        border-bottom-color: var(--purple-color);
        border-bottom-width: var(--card-border-width);
        border-bottom-style: solid;
      }
      .grid-area-expand {
        grid-area: 1/2/3/-1;
      }
      .grid-area-expand .card {
        width: 100%;
      }
    `,
  ],
})
export class NgxSuperDashboardComponent implements OnInit {
  dynamicForm!: FormGroup;
  @Input({ required: true })
  dynamicFormFieldData!: DynamicFieldsData[];

  @Input({ required: true }) cardConfig!: DynamicCardsData[];

  @Input({ required: true }) chartsConfig!: DashardCardConfig[];
  @Input() gridOneConfig!: CardTableDataConfig;
  @Input() gridTwoConfig!: GridTableConfigData;

  @Output() onSelect = new EventEmitter<SelectedFieldValueEmit>();
  @Output() onSubmit = new EventEmitter();

  @Output() onSelectChart = new EventEmitter<ChartEventEmitOnSelect>();

  constructor(private fb: FormBuilder) {
    console.log(`NgxSuperDashboardComponent : constructor`);
  }

  ngOnInit() {
    //create dynamic fields and add validation for each field
    console.log(this.gridTwoConfig, 'sdsdsd');
    console.log(`NgxSuperDashboardComponent : ngOnInit`);
    this.createForm();
  }

  typeCheck(data: any) {
    console.log(typeof data, 'slffksd');
    return data !== undefined && data != null && typeof data === 'object'
      ? true
      : false;
  }

  createForm() {
    let formGrp = {};
    this.dynamicFormFieldData.forEach((field: DynamicFieldsData) => {
      formGrp = {
        ...formGrp,
        [field.formControlKey]: ['', Validators.compose([Validators.required])],
      };
    });
    this.dynamicForm = this.fb.group(formGrp);
  }

  // emit selected field value
  seletedValue(ev: any) {
    this.onSelect.emit({
      selectedValue: ev.target.value,
      fieldControlName: ev.target.id,
    });
  }

  onSubmitForm(formValues: FormGroup) {
    this.onSubmit.emit(formValues);
  }

  selectedChart(ev: ChartSelectionChangedEvent, chartType: ChartType) {
    this.onSelectChart.emit({
      ev: ev,
      chartType: chartType,
    });
  }
}

export const DynamicFieldsConfiguration = (
  fieldConfig: DynamicFieldsData[]
): DynamicFieldsData[] => {
  if (fieldConfig) return fieldConfig;
  else return testFieldData;
};

export const testFieldData: DynamicFieldsData[] = [
  { lable: 'Zone', formControlKey: 'zone', lovDataList: [] },
  { lable: 'Branch', formControlKey: 'branch', lovDataList: [] },
  { lable: 'Teams', formControlKey: 'teams', lovDataList: [] },
  { lable: 'Product', formControlKey: 'product', lovDataList: [] },
  { lable: 'Start Date', formControlKey: 'startDate', type: 'date' },
  { lable: 'End Date', formControlKey: 'endDate', type: 'date' },
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
  className?: string;
}

export interface SelectedFieldValueEmit {
  selectedValue: string | number;
  fieldControlName: string;
}

export interface SetDataOption {
  fetchLovData: Record<string, string | number | any | null>[];
  value: string | number;
  name: string;
  name2?: string;
}

// interfaces for grid cardsList:
export const DynamicCardsConfiguration = (
  cardConfig: DynamicCardsData[]
): DynamicCardsData[] => {
  if (cardConfig) return cardConfig;
  else return testCardData;
};

export const testCardData: DynamicCardsData[] = [
  { title: 'Total Proposals', value: 700 },
  { title: 'On Process', value: 230 },
  { title: 'Sanctioned', value: 300 },
  { title: 'Rejected', value: 254 },
  { title: 'Opened prending for > 30 days', value: 143 },
  { title: 'Disbursed', value: 120 },
];

export interface DynamicCardsData {
  title: string;
  value: number | string | null;
  className?: string;
}

export const dashboardChartsConfig = (
  chartsData?: DashardCardConfig[]
): DashardCardConfig[] => {
  if (chartsData) {
    return chartsData;
  } else {
    return testChartsData;
  }
};

export const testChartsData: DashardCardConfig[] = [
  {
    type: ChartType.ComboChart,
    cardTitle: 'Monthly Wise',
    chartOptionData: {
      myColumns: ['Year', 'Retail', 'Agri', 'MSME', 'Gold', 'Corp'],

      chartOptions: {
        title: `Monthly Wise`,
        chartArea: { width: '50%' },
        hAxis: {
          title: `Modules`,
          minValue: 0,
        },
        vAxis: {
          title: 'No. Of Amount',
        },
        seriesType: 'bars',
        // series: { 4: { type: "line" } },
      },
    },
    chartData: [
      ['2023/05', 50, 33, 24.5, 33, 22],
      ['2024/05', 23, 41, 22.5, 22, 2],
      ['2021/05', 44, 82, 13, 43, 12],
      ['2023/05', 19, 33, 23, 21, 89],
      ['2022/05', 30, 20, 12, 34, 22],
    ],
    className: '',
  },
  {
    type: ChartType.PieChart,
    cardTitle: 'Total Sanctioned',
    chartOptionData: {
      myColumns: [
        ['Retail', 'Agri', 'MSME', 'GOLD', 'CORP'],
        'Leads Count',
        { role: 'style' },
      ],
      chartOptions: {
        title: `Sanctioned Amount`,
        chartArea: { width: '50%' },
        slices: {
          0: { color: '#622248' },
          1: { color: '#109618' },
          2: { color: '#3366cc' },
          3: { color: 'red' },
          4: { color: '#ff9900' },
        },
      },
    },
    chartData: [
      ['Retail', 3445, 'red'],
      ['Agri', 3445, 'red'],
      ['MSME', 3445, 'red'],
      ['Gold', 3445, 'red'],
    ],
    className: '',
  },
];

export interface DashardCardConfig {
  type: any | string;
  chartOptionData: ChartOptionsConfig;
  chartData: any[];
  cardTitle?: string;
  className?: string;
}

export interface ChartOptionsConfig {
  myColumns: any[];
  chartOptions: ChartAxisData;
}

export interface ChartAxisData {
  title: string;
  chartArea: { width?: string | number; height?: string | number };
  slices?: object | null;
  hAxis?: AxisVlaues;
  vAxis?: AxisVlaues;
  seriesType?: string;
  series?: object | null;
}

export interface AxisVlaues {
  title?: string;
  minValue?: number;
}

export interface ChartEventEmitOnSelect {
  ev: any;
  chartType: string;
}

export const CardTableDataConfig = (
  cardTableData?: CardTableDataConfig
): CardTableDataConfig => {
  if (cardTableData) {
    return cardTableData;
  } else {
    return testCardTable;
  }
};

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

export interface CardTableDataConfig {
  cardTitle?: string;
  tableColumnHeadings: string[];
  tableDataKey: string[];
  tableData: any[];
  className?: string;
}

export interface GridTableConfigData {
  title?: string;
  tableHeading: string[];
  tableDataKey: string[];
  tableData: any | object;
  className?: string;
}

export const gridTableDataConfig = (
  gridTableData?: GridTableConfigData
): GridTableConfigData => {
  if (gridTableData) {
    return gridTableData;
  } else {
    return testGridTable;
  }
};

export const testGridTable: GridTableConfigData = {
  title: 'Scheme Wise',
  tableHeading: [
    'Loan Type',
    'Scheme',
    'No of Acc #',
    'Limit in (Lakhs)',
    'OS amt in(Lakhs)',
  ],
  tableData: {
    'Car Loan': [
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
      {
        tpmSeqId: 62698,
        tpmCode: '2',
        tpmModifiedDate: '2024-04-24T07:49:20.889+0000',
        tpmPrdCode: 'Car Loan',
        schemeType: 'Luxury Car Loan',
        noOfAcc: '84',
        limit: '21232',
        Sanctioned: '121.45',
      },
    ],
    'Cash Loan': [
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
    'Corporate Home Loan': [
      {
        tpmSeqId: 55190,
        tpmCode: '1',
        tpmModifiedDate: '2024-03-28T04:41:16.542+0000',
        tpmPrdCode: 'Corporate Home Loan',
        schemeType: 'Topup Housing Loan',
        noOfAcc: 'S74',
        limit: '674',
        Sanctioned: '6787',
      },
    ],
    'Housing Loan': [
      {
        tpmSeqId: 55191,
        tpmCode: '1',
        tpmModifiedDate: '2024-03-28T04:41:16.542+0000',
        tpmPrdCode: 'Housing Loan',
        schemeType: 'Topup Housing Loan',
        noOfAcc: '456',
        limit: '7876',
        Sanctioned: '89',
      },
      {
        tpmSeqId: 62691,
        tpmCode: '2',
        tpmModifiedDate: '2024-04-24T07:49:20.884+0000',
        tpmPrdCode: 'Housing Loan',
        schemeType: 'Staff Housing Loan',
        noOfAcc: '75',
        limit: '435.65',
        Sanctioned: '784.32',
      },
      {
        tpmSeqId: 55198,
        tpmCode: '1',
        tpmModifiedDate: '2024-03-28T04:41:16.542+0000',
        tpmPrdCode: 'Housing Loan',
        schemeType: 'Housing Place Loan',
        noOfAcc: '68',
        limit: '232',
        Sanctioned: '459',
      },
    ],
    'Pensioner Loan': [
      {
        tpmSeqId: 62699,
        tpmCode: '2',
        tpmModifiedDate: '2024-04-24T07:49:20.889+0000',
        tpmPrdCode: 'Pensioner Loan',
        schemeType: 'Car Dealer',
        noOfAcc: '84',
        limit: '21232',
        Sanctioned: '121.45',
      },
    ],
    'Working Capital UCO Bank': [
      {
        tpmSeqId: 22735,
        tpmCode: '5',
        tpmModifiedDate: '2023-08-03T12:29:43.790+0000',
        tpmPrdCode: 'Working Capital UCO Bank',
        schemeType: 'Corporate Home Loan',
        noOfAcc: '342',
        limit: '2345',
        Sanctioned: '676',
      },
    ],
  },
  tableDataKey: ['schemeType', 'noOfAcc', 'limit', 'Sanctioned'],
};
