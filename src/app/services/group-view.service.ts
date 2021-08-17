import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { HTTPService } from './http.service';
import { Layer } from 'src/app/models/layer.model';

@Injectable({
	providedIn: 'root'
})

export class GroupViewService {

	url = environment.serverUrl + '/groupView';

	constructor(
		private httpService: HTTPService
	) {
	}

	getAll() {
		return this.httpService.get<any>(this.url + '/').toPromise();
	}

	update(params) {
		return this.httpService.put(this.url + '/', { params }).toPromise();
	}

	updateAdvanced(params) {
		return this.httpService.put(this.url + '/advanced', { params }).toPromise();
	}

	async getByGroupId(groupId) {
		const parameters = { groupId };
		return await this.httpService.get<Layer[]>(this.url + '/getByGroupId',
			{ params: parameters }
		).toPromise();
	}

	add(params) {
		return this.httpService.post(this.url + '/', { params }).toPromise();
	}

	async getAvailableLayers(groupId) {
		const parameters = { groupId };
		return await this.httpService.get<any>(this.url + '/getAvailableLayers',
			{ params: parameters }
		).toPromise();
	}
}
