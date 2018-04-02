import { NgModule, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'tab-panel',
    template: `
    <ul class="nav nav-underlines">
        <li *ngFor="let tab of tabList" class="nav-item">
            <a class="nav-link" (click)="selectTab(tab)" [ngClass]="{ 'active': tab.isActive }" href="javascript:void(0)">
                {{ tab.tabTitle }}
            </a>
        </li>
    </ul>
    `
})

export class TabPanel implements OnInit {
    @Input() tabList: any = [];
    @Output() onSelect: EventEmitter<String> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        if (this.tabList.length !== 0) {
            this.tabList = this.tabList.map(tab => {
                return {
                    tabTitle: tab,
                    isActive: false
                };
            });
            this.tabList[0].isActive = true;
        }
    }

    selectTab(tab) {
        this.tabList.forEach(tab => {
            tab.isActive = false;
        });
        tab.isActive = true;
        this.onSelect.emit(tab);
    }
}


@NgModule({
    imports: [CommonModule],
    declarations: [TabPanel],
    exports: [TabPanel],
    providers: []
})

export class TabPanelModule { }
