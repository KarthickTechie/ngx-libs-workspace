import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgxSuperDashboardService {
  formGroupSetting: any;

  set getFormGroup(formGrp: any) {
    this.formGroupSetting = formGrp;
  }
  get getFormGroup() {
    return this.formGroupSetting;
  }

  constructor() {}
}
