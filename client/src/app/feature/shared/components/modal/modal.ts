import { NgModule, Component, Output, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'app-modal',
    template: `
    <div class="modal" tabindex="-1" role="dialog" [hidden]="!showModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" [hidden]="!showModalHeader">
                    <ng-content select="modal-header"></ng-content>
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" (click)="closeModal()">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ng-content select="modal-body"></ng-content>
                </div>
                <div class="modal-footer" [hidden]="!showModalFooter">
                    <ng-content select="modal-footer"></ng-content>
                </div>
            </div>
        </div>
    </div>
    `
})

export class Modal {
    @Input() showModal: boolean = false;
    @Input() showModalHeader: boolean = false;
    @Input() showModalFooter: boolean = false;
    @Input() closeModalCallback: Function;

    closeModal() {
        this.closeModalCallback();
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [Modal],
    exports: [Modal],
    schemas: [NO_ERRORS_SCHEMA]
})

export class ModalModule { }
