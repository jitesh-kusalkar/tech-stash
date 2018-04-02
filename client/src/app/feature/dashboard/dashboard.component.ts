import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { DashboardService } from './dashboard.service';
import { DataService } from '../shared/services/data.service';

import { environment } from '../../../environments/environment';

import { User } from '../shared/models/user';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    user: User = new User();
    showModal: boolean = false;
    usersMasterData = [];

    constructor(private router: ActivatedRoute, private dashboardService: DashboardService,
        private dataService: DataService) {
        document.body.style.backgroundColor = '#eeeeee'; // To set background light-gray
        router.params.subscribe((params) => {
            this.dashboardService.getDashboardInfo(params.userId).then((res: any) => {
                let promises = [];
                this.user = res;
                this.dataService.setUserInformation(this.user); // Setting for global access
                for (let postId of this.user.posts) {
                    promises.push(this.dashboardService.getPostById(postId));
                }

                forkJoin(promises).subscribe(posts => {
                    console.log(posts);
                    this.user.activity = posts;
                });
            });
        });
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.showModal = true;
        this.dashboardService.getAllUsers().then(res => {
            this.usersMasterData = res;
        });
    }

    closeModal() {
        this.showModal = false;
    }
}
