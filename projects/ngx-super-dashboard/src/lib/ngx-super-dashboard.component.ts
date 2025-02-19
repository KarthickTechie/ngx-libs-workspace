import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartSelectionChangedEvent, ChartType } from 'angular-google-charts';
import { NgxSuperDashboardService } from './ngx-super-dashboard.service';

declare const google: any;

@Component({
  selector: 'lib-ngx-super-dashboard',
  template: `
    <div
      [ngClass]="
        dynamicFormFieldData && dynamicFormFieldData.length > 7
          ? 'formsBar fields-bar-second'
          : 'formsBar fields-bar'
      "
    >
      <form [formGroup]="dynamicForm" (ngSubmit)="onSubmitForm()">
        <div class="grid-label-bar" *ngIf="dynamicForm.value.length != 0">
          <ng-container
            *ngFor="let field of dynamicFormFieldData; let i = index"
          >
            <div
              [ngClass]="field.className ? field.className + ' list' : 'list'"
              *ngIf="
                field.hasOwnProperty('lovDataList') && field.lovDataList;
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
              {{ noteText }}
            </div>
          </div>
        </div>
      </form>
    </div>
    <div
      class="horizontalTemp grid-container"
      [style.margin-top]="dynamicFormFieldData.length > 7 ? '4.4rem' : '3rem'"
    >
      <div
        class="grid-area-countCards"
        *ngIf="cardConfig && cardConfig.length > 0"
      >
        <ng-container *ngFor="let item of cardConfig; let j = index">
          <div
            [ngClass]="item.className ? item.className + ' card' : 'card'"
            [style.background-color]="cardColors[j]"
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
        id="{{ 'expand' + i }}"
        class="grid-area-chart"
        *ngFor="let chart of chartsConfig; let i = index"
      >
        <!-- <ng-container *ngFor="let chart of chartsConfig; let i = index"> -->
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
            style="width: 100%; height: 80%"
            [type]="chart.type"
            [data]="chart.chartData"
            [columns]="chart.chartOptionData.myColumns"
            [options]="chart.chartOptionData.chartOptions"
            (select)="selectedChart($event, chart.type)"
          ></google-chart>
        </div>
        <div class="resizer" (click)="toggleExpand(i, 'expand' + i)">
          <span class="resizeIcon" *ngIf="showIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#5f6368"
            >
              <path
                d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"
              />
            </svg>
            <span class="popupText">Expand</span>
          </span>
          <span class="resizeIcon" *ngIf="!showIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#5f6368"
            >
              <path
                d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"
              />
            </svg>
            <span class="popupText">Collapse</span>
          </span>
        </div>
        <!-- </ng-container> -->
      </div>

      <div
        id="expand2"
        [ngClass]="
          gridTwoConfig
            ? 'grid-area-tableOne'
            : 'grid-area-tableOne gridTableOne'
        "
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
                    *ngFor="let item of gridOneConfig.tableData; let i = index"
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
        <div class="resizer" (click)="toggleExpand(2, 'expand2')">
          <span class="resizeIcon" *ngIf="showIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#5f6368"
            >
              <path
                d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"
              />
            </svg>
            <span class="popupText">Expand</span>
          </span>
          <span class="resizeIcon" *ngIf="!showIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#5f6368"
            >
              <path
                d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"
              />
            </svg>
            <span class="popupText">Collapse</span>
          </span>
        </div>
      </div>

      <div
        id="expand3"
        [ngClass]="
          gridOneConfig
            ? 'grid-area-tableRecords'
            : 'grid-area-tableRecords gridTableTwo'
        "
        *ngIf="
          gridTwoConfig && gridTwoConfig !== null && gridTwoConfig !== undefined
        "
      >
        <div
          [ngClass]="
            gridTwoConfig.className
              ? gridTwoConfig.className + ' card card-border-bottom'
              : 'card card-border-bottom'
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
                *ngIf="
                  gridTwoConfig.tableData && gridTwoConfig.tableData.length > 0
                "
              >
                <tbody>
                  <tr *ngFor="let parent of gridTwoConfig.tableData">
                    <td>
                      {{ parent.parentName }}
                    </td>
                    <td
                      [attr.colspan]="gridTwoConfig.tableDataKey.length"
                      class="colspan"
                    >
                      <tr
                        class="subTableRow"
                        *ngFor="let item of parent.childData"
                      >
                        <td *ngFor="let key of gridTwoConfig.tableDataKey">
                          {{ item[key] }}
                        </td>
                      </tr>
                    </td>
                  </tr>
                </tbody>
              </ng-container>
            </table>
          </div>
        </div>
        <div class="resizer" (click)="toggleExpand(3, 'expand3')">
          <span class="resizeIcon" *ngIf="showIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#5f6368"
            >
              <path
                d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"
              />
            </svg>
            <span class="popupText">Expand</span>
          </span>
          <span class="resizeIcon" *ngIf="!showIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#5f6368"
            >
              <path
                d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"
              />
            </svg>
            <span class="popupText">Collapse</span>
          </span>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .hideGrids {
        display: none !important;
      }
      .resizeIcon {
        position: relative;
      }

      .resizeIcon .popupText {
        visibility: hidden;
        width: 50px;
        background-color: black;
        font-size: 10px;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 5px;
        position: absolute;
        bottom: 125%;
        left: 35%;
        transform: translateX(-50%);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .resizeIcon .popupText::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }

      .resizeIcon:hover .popupText {
        visibility: visible;
        opacity: 1;
      }
      .template-box {
        background: #111249;
        position: fixed;
        right: -45px;
        transform: rotate(90deg);
        top: 50%;
        text-align: center;
      }

      .expanded {
        grid-area: 2 / 1 / -1 / -1 !important;
        justify-content: center;
      }

      .expanded google-chart {
        width: 100% !important;
        height: 90% !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .expanded.grid-area-tableOne .card,
      .expanded.grid-area-chart .card {
        width: 99%;
        height: 400px;
        overflow: auto;
      }

      .expanded.grid-area-tableRecords .card {
        width: 99%;
        height: 100%;
      }
      .expanded.grid-area-tableRecords .card-content {
        height: 500px;
        max-height: 1000px;
        overflow: auto;
      }

      .resizer {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 10px;
        top: 10px;
        cursor: pointer;
        visibility: hidden;
        background: #ead4d429;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 38%);
      }

      .form-ctrl {
        display: block;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        background-color: #111249;
        background-clip: padding-box;
        border-radius: 6px;
        text-align: center;
      }
      .subTableRow {
        display: inline-table;
        width: 100%;
      }
      .fields-bar {
        height: 48px;
      }
      .formsBar {
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 999;
        background-color: #111249;
        display: flex;
        align-items: center;
      }
      .fields-bar-second {
        height: 75px;
      }
      .fields-bar-second .grid-label-bar {
        grid-template-columns: auto auto auto auto auto auto;
        padding: 2px 14px;
      }
      .fields-bar .grid-label-bar {
        grid-template-columns: auto auto auto auto auto auto auto;
        gap: 10px;
        padding: 5px 14px;
      }
      .grid-label-bar {
        gap: 10px;
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
        font-size: 12px;
      }
      select::-ms-expand {
        display: none;
      }
      select:focus-visible {
        outline: none;
      }

      input::placeholder {
        color: #fff;
        opacity: 1;
      }
      option {
        background-color: #fff;
        color: #000;
      }
      .grid-container {
        --purple-color: #622248;
        --card-border-width: 8px;
      }
      .grid-container {
        height: auto !important;
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto auto;
        gap: 0px;
        background-color: #dddddd96;
        padding: 7px 0px;
        margin-top: 3rem;
      }
      .card {
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        margin: 5px 6px 12px;
        width: 20%;
        text-align: center;
        background-color: #fff;
        border-radius: 8px;
        position: relative;
      }

      .card .card-header {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        background: none;
        font-weight: 600;
        font-size: 15px;
      }

      .card .card-content {
        padding: 10px;
      }

      .card h3 {
        font-size: 15px;
        margin: 0;
      }

      .card p {
        font-weight: 600;
        font-size: 24px;
        color: #f0f2f4;
        margin-top: 0px;
        margin-bottom: 4px;
      }

      .grid-area-countCards .card-content {
        padding: 2px 10px 10px;
      }

      .grid-area-countCards .card-header {
        height: 42px;
        display: flex;
        border-bottom: none;
        align-items: center;
        justify-content: center;
        padding: 0px 10px !important;
      }

      .grid-area-countCards h3 {
        font-size: 14px;
        color: #f0f2f4;
      }
      .grid-area-countCards {
        grid-area: 1/1/2/-1;
        display: flex;
      }

      .grid-area-tableOne {
        grid-area: 3/1/-1/2;
        position: relative;
        display: flex;
        transition: grid-area 0.3s ease-in-out;
      }

      .gridTableOne {
        grid-area: 3/1/-1/-1;
      }

      .grid-area-tableOne .card {
        width: 100%;
        height: 300px;
        transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
      }

      .grid-area-chart {
        position: relative;
        display: flex;
        transition: grid-area 0.3s ease-in-out;
      }

      #expand0 {
        grid-area: 2/1/3/2;
      }

      #expand1 {
        grid-area: 2/2/3/-1;
      }

      .grid-area-chart:hover .resizer,
      .grid-area-tableRecords:hover .resizer,
      .grid-area-tableOne:hover .resizer {
        visibility: visible;
      }

      .grid-area-chart .card {
        width: 100%;
        height: 300px;
        transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
      }

      .grid-area-tableRecords {
        grid-area: 3/2/-1/-1;
        position: relative;
        display: flex;
        transition: grid-area 0.3s ease-in-out;
      }

      .gridTableTwo {
        grid-area: 3/1/-1/-1;
      }

      .grid-area-tableRecords .card {
        width: 100%;
        height: 300px;
        overflow: hidden;
        transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
      }

      .grid-area-tableRecords .card-content {
        height: 230px;
        max-height: 1000px;
        overflow: auto;
      }
      ::-webkit-scrollbar {
        display: block;
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.4);
      }

      ::-webkit-scrollbar-track {
        background: transparent;
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
      }
      .grid-table .colspan tr:last-child {
        border: none;
      }
      .grid-table td {
        padding: 5px 0;
      }
      .colspan td {
        border: none !important;
        width: 7vw !important;
      }

      .grid-table td:nth-child(1),
      .grid-table th:nth-child(1) {
        border-right: 1px solid #f2f2f2;
        width: 10vw;
      }

      .grid-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        width: 7vw;
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
        border-left-width: var(--card-border-width) !important;
        border-left-style: solid;
      }
      .card-border-bottom {
        border-bottom-color: var(--purple-color);
        border-bottom-width: var(--card-border-width) !important;
        border-bottom-style: solid;
      }
    `,
  ],
})
export class NgxSuperDashboardComponent implements OnInit {
  public dynamicForm!: FormGroup;
  showIcon: boolean = true;

  @Input({ required: true })
  dynamicFormFieldData!: DynamicFieldsData[];

  @Input({ required: true }) cardConfig!: DynamicCardsData[];
  @Input({ required: true }) chartsConfig!: DashardCardConfig[];
  @Input() gridOneConfig!: CardTableConfig;
  @Input() gridTwoConfig!: GridTableConfigData;

  @Input()
  noteText!: string;

  cardColors: string[] = CardsColors;

  @Output() onSelect = new EventEmitter<SelectedFieldValueEmit>();
  @Output() onSubmit = new EventEmitter<Record<string, string | number>>();
  @Output() onSelectChart = new EventEmitter<ChartEventEmitOnSelect>();

  constructor(
    private fb: FormBuilder,
    private ngxService: NgxSuperDashboardService
  ) {}

  ngOnInit() {
    //create dynamic fields and add validation for each field
    this.createForm();
  }

  toggleExpand(index: number, idName: string) {
    const content: HTMLElement = <HTMLElement>document.getElementById(idName);
    if (content.classList.contains('expanded')) {
      content.classList.remove('expanded');
      this.showIcon = !this.showIcon;
      for (let i = 0; i < 4; i++) {
        if (i != index) {
          let hideContent = <HTMLElement>document.getElementById('expand' + i);
          hideContent.classList.remove('hideGrids');
        }
      }
    } else {
      content.classList.add('expanded');
      this.showIcon = !this.showIcon;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      for (let i = 0; i < 4; i++) {
        if (i != index) {
          let hideContent = <HTMLElement>document.getElementById('expand' + i);
          hideContent.classList.add('hideGrids');
        }
      }
    }
  }

  createForm() {
    let formGrp = {};
    this.dynamicFormFieldData.forEach((field: DynamicFieldsData) => {
      formGrp = {
        ...formGrp,
        [field.formControlKey]: [
          field.selected ? field.selected : '',
          Validators.compose([Validators.required]),
        ],
      };
    });
    this.dynamicForm = new FormBuilder().group(formGrp);
    this.ngxService.getFormGroup = this.dynamicForm;
  }

  // emit selected field value
  seletedValue(ev: any) {
    this.onSelect.emit({
      selectedValue: ev.target.value,
      fieldControlName: ev.target.id,
    });
  }

  onSubmitForm() {
    this.onSubmit.emit(this.dynamicForm.value);
  }

  selectedChart(ev: ChartSelectionChangedEvent, chartType: string) {
    this.onSelectChart.emit({
      ev: ev,
      chartType: chartType,
    });
  }
}

export const CardsColors = [
  '#d962be',
  '#3e85f5',
  '#5cdc79fc',
  '#dc815cfc',
  '#5cc0dc',
  '#7b556c',
  '#c39e56',
];

export const DynamicFieldsConfiguration = (
  fieldConfig?: DynamicFieldsData[]
): DynamicFieldsData[] => {
  if (fieldConfig) return fieldConfig;
  else return testFieldData;
};

export const testFieldData: DynamicFieldsData[] = [
  {
    lable: 'Zone',
    formControlKey: 'zone',
    lovDataList: [
      { value: '1', name: 'Chennai' },
      { value: '2', name: 'Pune' },
    ],
  },
  {
    lable: 'Branch',
    formControlKey: 'branch',
    lovDataList: [
      { value: '1', name: 'Porur' },
      { value: '2', name: 'Tnagar' },
    ],
  },
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
  selected?: string | number;
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

// interfaces for grid cardsList:
export const DynamicCardsConfiguration = (
  cardConfig?: DynamicCardsData[]
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
  value: number | string;
  className?: string;
}

export const DashboardChartsConfig = (
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
        chartArea: { width: '70%', height: '70%' },
        hAxis: {
          title: `Modules`,
          minValue: 0,
        },
        vAxis: {
          title: 'No. Of Amount',
        },
        seriesType: 'bars',
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
  type: any;
  chartOptionData: ChartOptionsConfig;
  chartData: Array<ChartDataType[]>;
  cardTitle?: string;
  className?: string;
}

export type ChartDataType = string | number;

export interface ChartOptionsConfig {
  myColumns: any;
  chartOptions: ChartAxisData;
}

export type ColumnsType = string | number;

export interface ChartAxisData {
  title: string;
  chartArea: { width?: string | number; height?: string | number };
  slices?: object;
  hAxis?: AxisVlaues;
  vAxis?: AxisVlaues;
  seriesType?: string;
  series?: object;
}

export interface AxisVlaues {
  title?: string;
  minValue?: number;
}

export interface ChartEventEmitOnSelect {
  ev: ChartSelectionChangedEvent;
  chartType: string;
}

export const CardTableDataConfig = (
  cardTableData?: CardTableConfig
): CardTableConfig => {
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

export interface CardTableConfig {
  cardTitle?: string;
  tableColumnHeadings: string[];
  tableDataKey: string[];
  tableData: Array<Record<string, string | number>>;
  className?: string;
}

export interface GridTableConfigData {
  title?: string;
  tableHeading: string[];
  tableDataKey: string[];
  tableData: any;
  className?: string;
}

export type ChildDataType = string | number;

export const GridTableDataConfig = (
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
