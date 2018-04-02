import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { TableContentComponent } from './components/content-table/content-table.component';
import { TabViewModule } from './components/tab-view/tab-view';
import { TabPanelModule } from './components/tab-panel/tab-panel';
import { ModalModule } from './components/modal/modal';

import { ApiService } from './services/api.service';
import { SessionService } from './services/session.service';
import { DataService } from './services/data.service';
import { AuthGuard } from './services/auth-guard';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports: [CommonModule, RouterModule, TabViewModule, TabPanelModule, ModalModule],
    declarations: [],
    exports: [CommonModule, FormsModule, RouterModule, TabViewModule, TabPanelModule, ModalModule]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ApiService, SessionService, DataService, AuthGuard]
        };
    }
}
