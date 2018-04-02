import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { GroupService } from './group.service';
import { DataService } from '../shared/services/data.service';

@Component({
    moduleId: module.id,
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent {
    group: any = {};
    update: String = '';

    constructor(private router: ActivatedRoute, private groupService: GroupService,
        private dataService: DataService) {
        router.params.subscribe((params) => {
            this.groupService.getGroupById(params.groupId).then(res => {
                let postPromises = [];
                this.group = res;
                for(let postId of this.group.posts) {
                    postPromises.push(this.groupService.getPostById(postId));
                }

                forkJoin(postPromises).subscribe((posts: any) => {
                    console.log('posts', posts);
                });
            });
        });
    }

    submitPost() {
        let user = this.dataService.getUserInformation();
        let postPayload = {
            post: this.update,
            user: {
                id: user._id,
                name: user.firstName + ' ' + user.lastName
            },
            group: {
                id: this.group._id,
                name: this.group.name // Change it in group schema
            }
        }, promises = [];
        this.groupService.createPost(postPayload).then((post: any) => {
            this.groupService.postToGroup({ postId: post._id }, this.group._id).then((res) => {
                console.log('Successful');
            });

            for (let member of this.group.members) {
                promises.push(this.groupService.postToUser({ postId: post._id }, member.userId));
            }

            forkJoin(promises).subscribe(res => {
                console.log('Successful');
            });
        });
    }
}
