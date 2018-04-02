import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../shared/services/session.service';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router, private sessionService: SessionService) { }

    ngOnInit() {
    }

    logout() {
        this.sessionService.resetSession();
        this.router.navigate(['login']);
    }

}
