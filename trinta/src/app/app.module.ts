import { GoogleMapsModule } from '@angular/google-maps';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./core/interceptor/error.interceptor";
import {JwtInterceptor} from "./core/interceptor/jwt.interceptor";
import {AuthGuard} from "./core/guard/auth.guard";
import {AuthServiceService} from "./core/Services/auth-service.service";
import {AppComponent} from "./app.component";
import {LoginRedirectGuard} from "./core/guard/login_redirect_guard.guard";
import {NgModule} from "@angular/core";
import {CreateEventComponent} from "./components/Event/create-event/create-event.component";
import {SidebarComponent} from "./common/sidebar/sidebar.component";
import {HeaderComponent} from "./common/header/header.component";
import {provideRouter, RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {CommonModule, DatePipe, LocationStrategy, NgClass, NgIf, PathLocationStrategy} from "@angular/common";
import {BrowserModule, provideClientHydration} from "@angular/platform-browser";
import {ToggleService} from "./common/header/toggle.service";
import {NgScrollbarModule} from "ngx-scrollbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {FeathericonsModule} from "./icons/feathericons/feathericons.module";
import {MatOptionModule, provideNativeDateAdapter} from "@angular/material/core";
import {EventService} from "./core/Services/event.service";
import {MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FileUploadModule} from "@iplab/ngx-file-upload";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {AppRoutingModule, routes} from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideServerRendering} from "@angular/platform-server";
import {CarouselModule} from "ngx-owl-carousel-o";
import {DetailsEvenComponent} from "./components/Event/event-details/details-even.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {EventComponent} from "./components/Event/Listevent/event.component";
import {OverviewsComponent} from "./components/Dashbord/overviews/overviews.component";
import {MatTabsModule} from "@angular/material/tabs";
import {AlleventsComponent} from "./components/Dashbord/allevents/Statistic.component";
import {TodaysOrderComponent} from "./dashboard/ecommerce/website-overview/todays-order/todays-order.component";
import {TodaysRevenueComponent} from "./dashboard/ecommerce/website-overview/todays-revenue/todays-revenue.component";
import {AverageValueComponent} from "./dashboard/ecommerce/website-overview/average-value/average-value.component";
import {AllSpendingComponent} from "./dashboard/ecommerce/website-overview/all-spending/all-spending.component";
import {
  ExpectedEarningsComponent
} from "./dashboard/ecommerce/website-overview/expected-earnings/expected-earnings.component";
import {WeekReportComponent} from "./dashboard/ecommerce/website-overview/week-report/week-report.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {InvitationRequesterComponent} from "./components/Admin/invitation-requester/invitation-requester.component";
import {AllusersComponent} from "./components/Admin/allusers/allusers.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {SignInComponent} from "./authentication/sign-in/sign-in.component";
import {SignUpWorkerComponent} from "./authentication/sign-up-worker/sign-up-worker.component";
import {ResetPasswordComponent} from "./authentication/reset-password/reset-password.component";
import {LogoutComponent} from "./authentication/logout/logout.component";
import {ForgotPasswordComponent} from "./authentication/forgot-password/forgot-password.component";
import {ConfirmEmailComponent} from "./authentication/confirm-email/confirm-email.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import { RequestWorkerComponent } from "./components/Event/request-worker/request-worker.component";
import { FooterComponent } from "./common/footer/footer.component";
import {WebsiteOverviewComponent} from "./dashboard/ecommerce/website-overview/website-overview.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatProgressBar} from "@angular/material/progress-bar";
import {EcommerceComponent} from "./dashboard/ecommerce/ecommerce.component";
import {EarningsReportsComponent} from "./dashboard/ecommerce/earnings-reports/earnings-reports.component";
import {SalesByLocationsComponent} from "./dashboard/ecommerce/sales-by-locations/sales-by-locations.component";
import {RecentOrdersComponent} from "./dashboard/ecommerce/recent-orders/recent-orders.component";
import {TransactionsHistoryComponent} from "./dashboard/ecommerce/transactions-history/transactions-history.component";
import {SalesOverviewComponent} from "./dashboard/ecommerce/sales-overview/sales-overview.component";
import {TopSellingProductsComponent} from "./dashboard/ecommerce/top-selling-products/top-selling-products.component";
import {RevenueOverviewComponent} from "./dashboard/ecommerce/revenue-overview/revenue-overview.component";
import {VisitsByWeekComponent} from "./dashboard/ecommerce/visits-by-week/visits-by-week.component";
import {OrderStatisticsComponent} from "./dashboard/ecommerce/order-statistics/order-statistics.component";
import { ChangePasswordComponent } from "./settings/change-password/change-password.component";
import { SettingsComponent } from "./settings/settings.component";
import {AllApprovedSubmissionsComponent} from "./components/Event/event-details/all-approved-submissions/all-approved-submissions.component";
import { AllRequesterComponent } from './components/Admin/allusers/all-requester/all-requester.component';
import { ActiveWorkerComponent } from './components/Admin/allusers/active-worker/active-worker.component';
import { AllEventNotJoinedComponent } from './components/Event/all-event-not-joined/all-event-not-joined.component';
import { ChatbotComponent } from './components/chatbot/chatbot/chatbot.component';


import { TakeAssessmentComponent } from './components/Assessment/take-assessment/take-assessment.component';
import { AssessmentsListComponent } from './components/Assessment/assessemts-list/assessments-list.component';
import { MatListModule } from '@angular/material/list';  // Import MatListModule

@NgModule({
  declarations: [
    
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CreateEventComponent,
    DetailsEvenComponent,EventComponent,
    AlleventsComponent,
    OverviewsComponent,
    InvitationRequesterComponent,
    AllusersComponent,
    SignUpComponent,
    SignInComponent,
    SignUpWorkerComponent,
    ResetPasswordComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    AuthenticationComponent,
    RequestWorkerComponent,
    FooterComponent,
    AuthenticationComponent,
    WeekReportComponent,
    ExpectedEarningsComponent,
    TodaysOrderComponent,
    AverageValueComponent,
    AllSpendingComponent,
    WebsiteOverviewComponent,
    EcommerceComponent,
    ChangePasswordComponent,
    SettingsComponent,
    AllApprovedSubmissionsComponent,
    
    SettingsComponent,
    AllRequesterComponent,
    ActiveWorkerComponent,
    AllEventNotJoinedComponent,
    TakeAssessmentComponent,
    AssessmentsListComponent  

  ],
    imports: [
      FormsModule,
        BrowserModule,
        CommonModule,
        
        HttpClientModule,
        RouterModule.forRoot([]), // Add your routes here
        FormsModule,
        ReactiveFormsModule,
        NgScrollbarModule,
        MatExpansionModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatRadioModule,
        MatTooltipModule,
        MatIconModule,
        MatCheckboxModule,
        MatOptionModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        FeathericonsModule,
        NgxEditorModule,
        FileUploadModule,
        CarouselModule,
        AppRoutingModule,
        CarouselModule,
        TodaysRevenueComponent,
        NgApexchartsModule,
        MatProgressBar,
        EarningsReportsComponent,
        SalesByLocationsComponent,
        RecentOrdersComponent,
        TransactionsHistoryComponent,
        SalesOverviewComponent,
        TopSellingProductsComponent,
        RevenueOverviewComponent,
        VisitsByWeekComponent,
        OrderStatisticsComponent,
        BrowserModule,
        MatTooltipModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatListModule,

        GoogleMapsModule,

    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoginRedirectGuard, AuthGuard, AuthServiceService,
    provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
    ToggleService,
    provideNativeDateAdapter(),EventService,
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    DatePipe

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
