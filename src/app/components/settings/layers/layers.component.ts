import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { Location } from '@angular/common';

import { GroupViewService } from 'src/app/services/group-view.service';
import { GroupService } from 'src/app/services/group.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Group } from '../../../models/group.model';

@Component({
	selector: 'app-layers',
	templateUrl: './layers.component.html'
})

export class LayersComponent implements OnInit {
	groups: SelectItem[];

	selectedGroup;
	availableLayers;
	selectedLayers;
	groupLayersReceived = [];
	appendedLayers = [];
	removedLayers = [];

	constructor(
		private sidebarService: SidebarService,
		private location: Location,
		private groupViewService: GroupViewService,
		private groupService: GroupService,
		private messageService: MessageService,
	) {
	}

	async ngOnInit() {
		this.sidebarService.sidebarReload.next('settings');
		this.getAllGroups();
	}

	async getAllGroups() {
		this.groupService.getAll().then((data) => {
			if (data) {
				this.groups = data.map((group: Group) => ({ label: group.name, value: group.id }));
			}
		});
	}

	async onChangeOptionField(event) {
		const group = event.value;
		if (group) {
			await this.groupViewService.getByGroupId(group.value)
			.then((retorno) =>
			//refatorar
				retorno.filter(layer => layer["view"] || layer.name)
			)
			.then(layers => {
				this.selectedLayers = layers;
				this.groupLayersReceived = [...layers];
			});
			this.groupViewService.getAvailableLayers(group.value).then((availableGroupViews) => {
				if (availableGroupViews && Array.isArray(availableGroupViews) && availableGroupViews.length > 0) {
					this.availableLayers = availableGroupViews;
					// this.availableLayers = availableGroupViews.map((availableGroupView) => ({name: availableGroupView.name, viewId: availableGroupView.id}));
				}
				return [];
			});
		} else {
			this.selectedLayers = [];
			this.availableLayers = [];
		}
	}

  async update() {
    const layers = this.selectedLayers
      .map(layerId => ({
        groupId: this.selectedGroup.value, viewId: layerId.id
      }));
    this.groupViewService.update({ groupId: this.selectedGroup.value, layers })
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Camadas do grupo atualizadas'
        });
      });
  }
  async appendLayer(param) {
    param.forEach(layer => {
      if (!this.groupLayersReceived.find(({ id }) => id === layer.id)) {
        this.appendedLayers.push(layer);
      }
    });
  }
  async removeLayer(param) {
    param.forEach(layer => {
      if (this.groupLayersReceived.find(({ id }) => id === layer.id)) {
        this.removedLayers.push(layer);
      }
    });
  }
}
