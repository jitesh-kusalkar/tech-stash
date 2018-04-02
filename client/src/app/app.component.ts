import { Component, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './feature/shared/services/session.service';
import { DataService } from './feature/shared/services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    showHeader: boolean = false;
    userLoggedIn: EventEmitter<boolean> = new EventEmitter();
    constructor(private router: Router, private sessionService: SessionService,
        private dataService: DataService) {
        this.userLoggedIn = this.sessionService.isUserLoggedIn.subscribe(isLoggedIn => this.showHeader = isLoggedIn);
        if (!this.sessionService.isLoggedIn()) {
            this.showHeader = false;
            this.router.navigate(['login']);
        } else {
            this.showHeader = true;
            this.router.navigate(['dashboard', this.dataService.getUserInformation()._id]);
        }
    }

    ngOnDestroy() {
        this.userLoggedIn.unsubscribe();
    }
}
