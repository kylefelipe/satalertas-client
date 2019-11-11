import {Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { NgForm } from '@angular/forms';
import {FilterService} from '../../services/filter.service';
import {FilterTheme} from '../../models/filter-theme.model';
import {ThemeAreaComponent} from './theme-area/theme-area.component';
import {FilterParam} from '../../models/filter-param.model';
import {FilterAuthorization} from '../../models/filter-authorization.model';
import {AuthorizationAreaComponent} from './authorization-area/authorization-area.component';
import {AlertTypeAreaComponent} from './alert-type-area/alert-type-area.component';
import {SpecificSearchAreaComponent} from './specific-search-area/specific-search-area.component';
import {FilterSpecificSearch} from '../../models/filter-specific-search.model';
import {FilterAlertType} from '../../models/filter-alert-type.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit, AfterViewInit {

  @ViewChild('filterForm', { static: false }) filterForm: NgForm;
  @ViewChild('themeAreaComponent', {static: false}) themeAreaComponent: ThemeAreaComponent;
  @ViewChild('alertTypeAreaComponent', {static: false}) alertTypeAreaComponent: AlertTypeAreaComponent;
  @ViewChild('authorizationAreaComponent', {static: false}) authorizationAreaComponent: AuthorizationAreaComponent;
  @ViewChild('specificSearchAreaComponent', {static: false}) specificSearchAreaComponent: SpecificSearchAreaComponent;

  authorizationDisable: boolean;

  filterParam: FilterParam;
  filterLabel: string;
  displayFilter: boolean;

  constructor(
    private configService: ConfigService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.authorizationDisable = true;

    this.filterParam = new FilterParam(undefined, undefined, undefined, undefined);
  }

  ngAfterViewInit() {
    this.setOverlayEvents();
  }

  setOverlayEvents() {
    this.filterService.displayFilter.subscribe(() => this.onDisplayFilter());
  }

  updateFilter() {
    localStorage.removeItem('filterList');
    localStorage.setItem('filterList', JSON.stringify(this.filterParam));
  }

  onDialogHide() {
    this.onCloseClicked();
  }

  onDisplayFilter() {
    this.displayFilter = !this.displayFilter;

    this.filterLabel = 'Filtro';
  }

  onCloseClicked() {
    this.displayFilter = false;
  }

  onFilterClicked() {
    this.updateFilter();

    console.log(this.filterParam);

    this.filterService.filterMap.next();
    this.filterService.filterDashboard.next();
    this.filterService.filterTable.next();
    this.filterService.filterReport.next();
  }

  onClearFilterClicked() {
    this.authorizationDisable = true;

    this.cleanOthers();
    this.specificSearchAreaComponent.clearAll();
  }

  onUpdateFilterTheme(theme: FilterTheme) {
    this.filterParam.themeSelected = theme;
  }

  onUpdateAlertType(alertType: FilterAlertType) {
    this.filterParam.alertType = alertType;
  }

  onUpdateAuthorization(authorization: FilterAuthorization) {
    console.log('OnUpdateAuthorization: ', authorization);
    this.filterParam.autorization = authorization;
  }

  onUpdateSpacificSearch(spacificSearch: FilterSpecificSearch) {
    if (spacificSearch) { this.cleanOthers(); }
    this.filterParam.specificSearch = spacificSearch;
  }

  cleanOthers() {
    this.themeAreaComponent.clearAll();
    this.authorizationAreaComponent.clearAll();
    this.alertTypeAreaComponent.clearAll();
  }
}