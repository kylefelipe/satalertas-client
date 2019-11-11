
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Alert} from '../../../models/alert.model';
import {ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {

  @Input() alertsDisplayed: Alert [] = [];

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNubermImmobileClick: EventEmitter<Alert> = new EventEmitter<Alert>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAreaClick: EventEmitter<Alert> = new EventEmitter<Alert>();

  constructor(
  ) { }

  ngOnInit() {
  }

  getLabelArea(alert: Alert) {
    let label: string;

    if (this.isBurnedArea(alert.codgroup)) {
      label = 'Cicatriz:';
    } else if (this.isFocus(alert.codgroup)) {
      label = 'Nº Focos:';
    } else {
      label = 'Área:';
    }

    return label;
  }

  getUnitOfMeasurement(alert: Alert) {
    return (this.isFocus(alert.codgroup) ? '' : 'ha');
  }

  getLabelNumCars(alert: Alert) {
    return 'Alertas:';
  }

  getValeuArea(alert: Alert) {
    return alert.value2;
  }

  getValueNumCars(alert: Alert) {
    return alert.value1;
  }

  isFocus(codgroup) {
    return codgroup === 'FOCOS';
  }

  isBurnedArea(codgroup) {
    return codgroup === 'AREA_QUEIMADA';
  }
}