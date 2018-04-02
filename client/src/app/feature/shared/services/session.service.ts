// Imports
import { Injectable, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/user';

export interface ILoader {
    isLoading: boolean;
}

/**
 * Service for managing the session data for logged in user
 * [Injectable]-> Annotation to indicate that service will be injectale in application.
 */
@Injectable()
export class SessionService {
    loggedIn: boolean = false;
    loader: ILoader = { isLoading: false };

    public isUserLoggedIn: EventEmitter<boolean> = new EventEmitter();

    /**
     * [Checks if user is logged in.]
     */
    isLoggedIn() {
        this.loggedIn = Cookie.get('isLoggedIn') === 'true' ? true : false;
        return this.loggedIn;
    }

    setIsLoggedIn(user: User) {
        //Cookie.set('authtoken', btoa('' + user.userName + ':' + user.password + ''));
        this.isUserLoggedIn.emit(true);
        return Cookie.set('isLoggedIn', 'true', 0);
    }

    /**
     * [Provides access token of current logged in user from session]
     */
    getAccessToken() {
        return Cookie.get('accessToken');
    }

    setAccessToken(accessToken: any) {
        return Cookie.set('accessToken', accessToken, 0);
    }

    getRefreshToken() {
        return Cookie.get('refreshToken');
    }

    setRefreshToken(refreshToken: any) {
        return Cookie.set('refreshToken', refreshToken, 0);
    }

    getExpiry() {
        return Cookie.get('expiry');
    }

    setExpiry(expiry: any) {
        return Cookie.set('expiry', this.getExpiryDate(expiry), 0);
    }

    /**
     * [Create session for current logged in user.]
     *
     **/
    setContext(loginModel: any = {}) {
        this.loggedIn = true;
        Cookie.set('isLoggedIn', 'true', 0);
        Cookie.set('accessToken', loginModel.accessToken, 0);
        this.isUserLoggedIn.emit(true);
        //Cookie.set('expiry', this.getExpiryDate(loginModel.expiry), 0); // 'Tue Jul 19 2016 16:25:58 GMT+0530 (IST)'
        //Cookie.set('refreshToken', loginModel.refreshToken, 0);
    }

    /**
     * [Reset session of current logged in user.]
     */
    resetSession() {
        this.loggedIn = false;
        /* Cookie.delete('isLoggedIn');
        Cookie.delete('accessToken'); */
        Cookie.deleteAll();
        this.isUserLoggedIn.emit(false);
        //Cookie.delete('expiry');
        //Cookie.delete('refreshToken');
    }

    showLoader() {
        this.loader.isLoading = true;
    }

    hideLoader() {
        this.loader.isLoading = false;
    }

    isLoading() {
        return this.loader.isLoading;
    }

    private getExpiryDate(expiry: string) {
        let expiryDate = new Date(expiry);
        let durationInMinutes = 1;
        expiryDate.setMinutes(expiryDate.getMinutes() - durationInMinutes);
        return expiryDate.toString();
    }
}
