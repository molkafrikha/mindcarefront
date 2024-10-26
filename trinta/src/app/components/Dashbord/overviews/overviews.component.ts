

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TodaysOrderComponent } from '../../../dashboard/ecommerce/website-overview/todays-order/todays-order.component';
import { TodaysRevenueComponent } from '../../../dashboard/ecommerce/website-overview/todays-revenue/todays-revenue.component';
import { AverageValueComponent } from '../../../dashboard/ecommerce/website-overview/average-value/average-value.component';
import { AllSpendingComponent } from '../../../dashboard/ecommerce/website-overview/all-spending/all-spending.component';
import { ExpectedEarningsComponent } from '../../../dashboard/ecommerce/website-overview/expected-earnings/expected-earnings.component';
import { WeekReportComponent } from '../../../dashboard/ecommerce/website-overview/week-report/week-report.component';
import { EventService } from '../../../core/Services/event.service';


@Component({
  selector: 'app-overviews',
  templateUrl: './overviews.component.html',
  styleUrl: './overviews.component.scss'
})
export class OverviewsComponent {

  totalUsers: number;
  totalEventsToday: number;
  constructor(private statsService: EventService) {}

    ngOnInit(): void {
        
    }

    
}

