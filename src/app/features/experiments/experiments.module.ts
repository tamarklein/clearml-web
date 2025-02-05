import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperimentSharedModule} from './shared/experiment-shared.module';
import {SMSharedModule} from '../../webapp-common/shared/shared.module';
import {ExperimentRouterModule} from './experiments-routing.module';
import {ExperimentsComponent} from './experiments.component';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducer, StoreModule} from '@ngrx/store';
import {experimentsReducers} from './reducers';
import {AdminService} from '../admin/admin.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectModelModule} from '../../webapp-common/select-model/select-model.module';
import {SmSyncStateSelectorService} from '../../webapp-common/core/services/sync-state-selector.service';
import {ExperimentOutputEffects} from './effects/experiment-output.effects';
import {ExperimentsMenuEffects} from './effects/experiments-menu.effects';
import {LayoutModule} from '../../layout/layout.module';
import {createLocalStorageReducer} from '../../webapp-common/core/meta-reducers/local-storage-reducer';
import {ExperimentGraphsModule} from '../../webapp-common/shared/experiment-graphs/experiment-graphs.module';
import {ExperimentCompareSharedModule} from '../../webapp-common/experiments-compare/shared/experiment-compare-shared.module';
import {AngularSplitModule} from 'angular-split';
import {SMMaterialModule} from '../../webapp-common/shared/material/material.module';
import {ExperimentsCommonModule} from '../../webapp-common/experiments/common-experiments.module';
import {CommonLayoutModule} from '../../webapp-common/layout/layout.module';
import {EXPERIMENTS_PREFIX} from '../../webapp-common/experiments/actions/common-experiments-view.actions';
import {EXPERIMENTS_INFO_PREFIX} from '../../webapp-common/experiments/actions/common-experiments-info.actions';
import {EXPERIMENTS_OUTPUT_PREFIX} from '../../webapp-common/experiments/actions/common-experiment-output.actions';
import {EXPERIMENTS_STORE_KEY} from '../../webapp-common/experiments/shared/common-experiments.const';
import {ExperimentInfoComponent} from './containers/experiment-info/experiment-info.component';
import {DebugImagesModule} from '../../webapp-common/debug-images/debug-images.module';
import {ExperimentInfoExecutionComponent} from '../../webapp-common/experiments/containers/experiment-info-execution/experiment-info-execution.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {ExperimentOutputComponent} from './containers/experiment-ouptut/experiment-output.component';


const syncedKeys = [
  'view.projectColumnsSortOrder',
  'view.projectColumnFilter',
  'view.projectColumnsWidth',
  'view.hiddenProjectTableCols',
  'view.metricsCols',
  'view.colsOrder',
  'info.userKnowledge',
  'output.settingsList',
];
const key = EXPERIMENTS_STORE_KEY;
const actionsPrefix = [EXPERIMENTS_PREFIX, EXPERIMENTS_INFO_PREFIX, EXPERIMENTS_OUTPUT_PREFIX];

export function localStorageReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return createLocalStorageReducer(key, syncedKeys, actionsPrefix)(reducer);
}

@NgModule({
  imports: [
    SMMaterialModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    CommonModule,
    ExperimentsCommonModule,
    SMSharedModule,
    ExperimentRouterModule,
    ExperimentSharedModule,
    ExperimentGraphsModule,
    SelectModelModule,
    DebugImagesModule,
    ExperimentCompareSharedModule,
    CommonLayoutModule,
    MatSidenavModule,
    MatListModule,
    AngularSplitModule,
    StoreModule.forFeature(EXPERIMENTS_STORE_KEY, experimentsReducers, {metaReducers: [localStorageReducer]}),
    EffectsModule.forFeature([ExperimentOutputEffects, ExperimentsMenuEffects]),
  ],
  declarations: [
    ExperimentsComponent,
    ExperimentInfoComponent,
    ExperimentInfoExecutionComponent,
    ExperimentOutputComponent
  ],
  providers: [
    AdminService,
    SmSyncStateSelectorService
  ]
})
export class ExperimentsModule {
}
