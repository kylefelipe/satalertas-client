import { Injectable } from '@angular/core';

import { HTTPService } from './http.service';

import { ConfigService } from './config.service';

import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';

import { tap } from 'rxjs/operators';

import { SidebarService } from './sidebar.service';

import { environment } from 'src/environments/environment';

import { Response } from '../models/response.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	authConfig;

	user = new BehaviorSubject<User>(null);
	private tokenExpirationTimer: any;

	constructor(
		private hTTPService: HTTPService,
		private configService: ConfigService,
		private sidebarService: SidebarService
	) {
	}

	login(params) {
		const authConfig = this.configService.getAuthConfig();
		return this.hTTPService.post<Response>(environment.serverUrl + authConfig.url, {params})
		.pipe(tap((response: Response) => this.handleAuthentication(response.data)));
	}

	autoLogin() {
		const userData: User = JSON.parse(localStorage.getItem('userData'));
		if (!userData) {
			return;
		}

		const user = new User(
			userData.id,
			userData.name,
			userData.email,
			userData.username,
			userData.administrator,
			userData.tokenCode,
			new Date(userData.tokenExpirationDate)
		);

		if (user.token) {
			this.user.next(user);
			const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}
	}

	logout() {
		this.user.next(null);
		localStorage.removeItem('userData');
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
		this.sidebarService.sidebarReload.next();
	}

	autoLogout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
		this.sidebarService.sidebarReload.next();
	}

	private handleAuthentication(loggedUser) {
		if (!loggedUser) {
			return false;
		}
		const authConfig = this.configService.getAuthConfig();
		let expiresIn = authConfig.expiresIn;
		if (!environment.production) {
			expiresIn = 31536000;
		}
		const expiration = expiresIn * 1000;
		const user = new User(
			loggedUser.id,
			loggedUser.name,
			loggedUser.email,
			loggedUser.username,
			loggedUser.administrator,
			loggedUser.token,
			new Date(new Date().getTime() + expiration));
		this.user.next(user);
		this.autoLogout(expiration);
		localStorage.setItem('userData', JSON.stringify(user));
	}
}
