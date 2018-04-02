import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'tab-view',
    template: `
        <ul class="nav" [ngClass]="navType">
            <li *ngFor="let tab of tabTitles" class="nav-item">
                <i class="fa {{ tab.icon }}" [ngClass]="{ 'active': tab.isActive }" *ngIf="tab.icon" aria-hidden="true"></i>
                <a class="nav-link" (click)="selectTab(tab)" [ngClass]="{ 'active': tab.isActive }" href="javascript:void(0)">
                    {{ tab.tabTitle }}
                </a>
            </li>
        </ul>
        <ng-content></ng-content>
    `,
    styleUrls: ['./tab-view.scss']
})

export class TabView {
    @Input() navType: String = 'nav-underlines';
    tabTitles: Tab[] = [];

    addTabTitle(tab) {
        if(this.tabTitles.length === 0) {
            tab.isActive = true;
        }
        this.tabTitles.push(tab);
    }

    selectTab(tab) {
        this.tabTitles.forEach(tab => {
            tab.isActive = false;
        });
        tab.isActive = true;
    }
}

@Component({
    moduleId: module.id,
    selector: 'tab',
    template: `
        <div [hidden]="!isActive">
            <ng-content></ng-content>
        </div>
    `
})

export class Tab {
    @Input() tabTitle: String;
    @Input() icon: String;
    isActive: boolean;

    constructor(private tabView: TabView) {
        this.tabView.addTabTitle(this);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [TabView, Tab],
    exports: [TabView, Tab],
    providers: []
})

export class TabViewModule { }
