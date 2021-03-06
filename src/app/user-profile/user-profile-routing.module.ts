/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileFormComponent } from './user-profile-form.component';
import { UserProfileComponent } from './user-profile.component';
import { AppRoutes } from '../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes> [{
      path: '',
      component: UserProfileComponent,
      breadcrumbIgnore: true,
    }, {
      path: 'edit',
      component: UserProfileFormComponent,
      breadcrumb: 'T_PROFILE_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
