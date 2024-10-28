import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';


import { NotFoundComponent } from './common/not-found/not-found.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SignUpWorkerComponent } from './authentication/sign-up-worker/sign-up-worker.component';

import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { CrmComponent } from './dashboard/crm/crm.component';
import { ProjectManagementComponent } from './dashboard/project-management/project-management.component';
import { LmsComponent } from './dashboard/lms/lms.component';
import { HelpDeskComponent } from './dashboard/help-desk/help-desk.component';
import { AlleventsComponent } from './components/Dashbord/allevents/Statistic.component';

import { SettingsComponent } from './settings/settings.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';


import { IconsComponent } from './icons/icons.component';
import { FeathericonsComponent } from './icons/feathericons/feathericons.component';
import { RemixiconComponent } from './icons/remixicon/remixicon.component';
import { MaterialSymbolsComponent } from './icons/material-symbols/material-symbols.component';

import { CreateEventComponent } from './components/Event/create-event/create-event.component';
import { DetailsEvenComponent } from './components/Event/event-details/details-even.component';
import { EventComponent } from './components/Event/Listevent/event.component';

import { InvitationRequesterComponent } from './components/Admin/invitation-requester/invitation-requester.component';
import { AllusersComponent } from './components/Admin/allusers/allusers.component';
import {AuthGuard} from "./core/guard/auth.guard";
import { RequestWorkerComponent } from './components/Event/request-worker/request-worker.component';
import { NgModule } from '@angular/core';
import {
  WorkerApprovedSubmissionsComponent
} from "./components/Event/event-details/worker-approved-submissions/worker-approved-submissions.component";
import {
  AllApprovedSubmissionsComponent
} from "./components/Event/event-details/all-approved-submissions/all-approved-submissions.component";
import { AllEventNotJoinedComponent } from './components/Event/all-event-not-joined/all-event-not-joined.component';
import { TakeAssessmentComponent } from './components/Assessment/take-assessment/take-assessment.component';
import { AssessmentsListComponent } from './components/Assessment/assessemts-list/assessments-list.component';
import { ChatbotComponent } from './components/chatbot/chatbot/chatbot.component';


export const routes: Routes = [

  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: '', component: AccountSettingsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ]
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'signupworker', component: SignUpWorkerComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      {  path: 'set-new-password/:user_id/:token', component: ResetPasswordComponent },
      { path: 'lock-screen', component: LockScreenComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },

  // event urls
  { path: 'CreateEvent', component: CreateEventComponent },
  { path: 'events/:id', component: DetailsEvenComponent },
  { path: 'submissions/event/:event_id', component: AllApprovedSubmissionsComponent },
  {
    path: 'events/:eventId/worker/:workerId/submissions-approved',
    component: WorkerApprovedSubmissionsComponent
  },
  { path: 'Listevent', component: EventComponent },

  { path: 'NotjoinedEvent', component: AllEventNotJoinedComponent },

   // Take Assessment URL
   { path: 'take-assessment', component: TakeAssessmentComponent },
   { path: 'assessments-list', component: AssessmentsListComponent },

  // dashboard url
  {
    path: 'Dashboard',
    component: AlleventsComponent,

  },
  { path: 'dashboard/:id', component: AlleventsComponent },
  { path: 'admin/worker-dashboard/:workerId', component: AlleventsComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/authentication', pathMatch: 'full'}]
  },
  // admin
  { path: 'invitation', component: InvitationRequesterComponent },
  { path: 'allusers', component: AllusersComponent },
  { path: 'Requestworker', component: RequestWorkerComponent },
  { path: '**', component: NotFoundComponent },

  { path: 'chatbot', component: ChatbotComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




