import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property.model';
import { MapService } from '../../../services/map.service';

@Component({
	selector: 'app-property-data',
	templateUrl: './synthesis-property-data.component.html',
	styleUrls: ['./synthesis-property-data.component.css']
})
export class SynthesisPropertyDataComponent implements OnInit {

	@Input() property: Property;

	constructor(
		private mapService: MapService
	) {
	}

	ngOnInit() {

	}

	formatterCpfCnpj(cpfCnpj) {
		return this.mapService.formatterCpfCnpj(cpfCnpj);
	}

}