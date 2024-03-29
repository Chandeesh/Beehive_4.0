import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private httpClient: HttpClient) {
	}

   public authenticate(username, password) {
		return this.httpClient.post<any>('http://192.168.0.102:8080/authenticate', { username, password }).pipe(
			map(
				userData => {
					sessionStorage.setItem('username', username);
					let tokenStr = 'Bearer ' + userData.token;
					sessionStorage.setItem('jwt', tokenStr);
					return userData;
				}
			)

		);
	}

}
