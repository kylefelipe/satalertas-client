import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'map', component: MapComponent },
  { path: 'report', component: ReportComponent },
  { path: 'report/:carRegister', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
