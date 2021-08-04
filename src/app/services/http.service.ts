import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';

import {catchError, retry} from 'rxjs/operators';

import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HTTPService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    get<T>(url, params = {}): Observable<T> {
        return this.httpClient.get<T>(url, params)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    post(url, params = {}) {
        if (!url) {
            return;
        }
        return this.httpClient.post(url, params).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    put(url, params = {}) {
        if (!url) {
            return;
        }
        return this.httpClient.put(url, params).pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    delete(url, params = {}) {
        if (!url) {
            return;
        }
        return this.httpClient.delete(url, params).pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    postTerrama(url, parameters = {}) {
        if (!url) {
            return;
        }
        const terramaUrl = environment.terramaUrl;
        if (!url.includes(terramaUrl)) {
            url = terramaUrl + url;
        }
        return this.httpClient.post(url, {
            params: parameters
        }).pipe(
            retry(0),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(`Error occured: ${error.message}`);
    }

}
