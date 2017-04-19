import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: GroupListComponent,
      data: { breadcrumbIgnore: true },
    }, {
        path: ':parentId',
        component: GroupListComponent,
        data: { breadcrumbIgnore: true },
      }])
  ],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
