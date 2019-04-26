import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { AuthServiceLoader } from './guards/auth-service.loader';
import { AuthGuard } from './guards/auth.guard';
import { OAuthService } from './services/oauth.service';
import { AuthService } from './services/auth.service';
import { AdminUserService } from './services/admin-user.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NotificationService } from './services/notification.service';
import { AdminGroupService } from './services/admin-group.service';
import { AdminFormService } from './services/admin-form.service';
import { AdminProjectService } from './services/admin-project.service';
import { AdminRelationService } from './services/admin-relation.service';
import { AdminEmailTemplateService } from './services/admin-email-template.service';
import { AdminGuard } from './guards/admin.guard';
import { AssessmentService } from './services/assessment.service';
import { FormService } from './services/form.service';
import { ConfirmationService } from './services/confirmation.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AccountService } from './services/account.service';
import { EventService } from './services/event.service';
import { AdminEventService } from './services/admin-event.service';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';
import { UserPictureService } from './services/user-picture.service';
import { InviteService } from './services/invite.service';

@NgModule({
  imports: [
    SharedModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    SidebarNavComponent,
    BreadcrumbComponent,
    FooterComponent,
    LayoutComponent
  ],
  providers: [
    AccountService,
    AuthService,
    AuthServiceLoader,
    OAuthService,
    AuthGuard,
    AdminGuard,
    UserService,
    InviteService,
    AdminUserService,
    AdminGroupService,
    NotificationService,
    EventService,
    AdminEventService,
    AdminFormService,
    FormService,
    ProjectService,
    AdminProjectService,
    AdminRelationService,
    AdminEmailTemplateService,
    AssessmentService,
    ConfirmationService,
    BreadcrumbService,
    UserPictureService
  ],
  exports: [
    HeaderComponent,
    SidebarNavComponent,
    BreadcrumbComponent,
    FooterComponent,
    LayoutComponent
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
