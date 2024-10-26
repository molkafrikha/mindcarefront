
import { AuthServiceService } from '../../../core/Services/auth-service.service';

import { Component, OnInit, ViewChild } from '@angular/core';

import { AfterViewInit } from '@angular/core';
import { Event } from '../../../core/models/event';
import { Device } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { DeviceSpecService } from '../../../core/Services/device-spec.service';
import {  ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexTooltip, ApexDataLabels } from 'ng-apexcharts';
import { ApexChart, ApexFill, ApexGrid, ApexLegend, ApexNonAxisChartSeries, ApexStroke } from 'ng-apexcharts';
import { EventService } from '../../../core/Services/event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

interface EventStatistics {
  title: string;
  acceptance_ratio: number;
  participation_rate:number;
  total_submissions : number;
  
  // Ajoutez d'autres champs si nécessaire
}

export type ChartOptions = {
  series: any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle; // Make this required
  tooltip: ApexTooltip;     // Make this required
  grid: ApexGrid;           // Make this required
  dataLabels: ApexDataLabels;
};
export interface EventStatistic {
  id: number;
  title: string;
  total_workers: number;
  total_submissions: number;
  participation_rate: number;
  approval_rate: number | null;
  
}

export interface Events {
  event_title: string;
  workers: string[];
}

@Component({
  selector: 'app-allevents',
  templateUrl: './Statistic.component.html',
  styleUrls: ['./Statistic.component.scss']
  
})
export class AlleventsComponent implements OnInit ,AfterViewInit   {

  map: L.Map;
  workers: any[] = [];
  displayedColumns: string[] = ['user__fullName', 'acceptance_ratio'];
  displayedColumnsworkerss: string[] = ['event_title', 'workers'];
  displayedColumnsEvent: string[] = ['title', 'acceptance_ratio' , 'Participation_rate' , 'total_submissions'];
  dataSource = new MatTableDataSource<any>();
  dataSourceevent = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatPaginator) paginatorEvents!: MatPaginator;
  displayedColumnsRequester: string[] = ['event_title', 'total_photos_requested', 'total_photos_received', 'total_workers_joined', 'total_rewards', 'total_data_saving' , 'status'];
  dataSourceRequester = new MatTableDataSource<any>();
  dataSourceworker = new MatTableDataSource<any>();
  @ViewChild('paginatorWorker') paginatorWorker!: MatPaginator;
  @ViewChild('paginatorRequester') paginatorRequester!: MatPaginator;
  
  //// requester dashborad statistic //// 
 
  total_events: number = 0;
  total_workers_joined: number = 0;
  total_photos_requested: number = 0;
  total_photos_received: number = 0;
  acceptance_ratio: number = 0;
  participation_rate : number =0;
  total_submissions : number = 0;
  total_rewards : number = 0;
  total_data_saving : number = 0;
///////  Worker dashboard 
worker_id : any ;
total_eventsJoined: number = 0;
total_imageSubmitted: number = 0;
total_imageApproved: number = 0;
acceptance_ratioWorker: number = 0;
totalEarning : number = 0 ;
total_data_consumed : number = 0 ;


  total_workers : number = 0;
  total_requester : number = 0;
  totalUsers: number = 0;
  totalEventsToday: number = 0;
  totalevent : number = 0;
  submissionCount: number = 0;
  selectedTimeRange: string = 'This Year';
  workerStatistics: any = {};
  participationRate: number = 0;
  eventStatistics: EventStatistic[] = [];
  chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'bar' // You can choose 'bar', 'line', etc.
    },
    xaxis: {
      categories: []
    },
    yaxis: {
      title: {
        text: 'Events'
      }
    },
    title: {
      text: 'Events Statistics',
      align: 'left'
    },
    tooltip: {
      enabled: true
    },
    grid: {
      show: true
    },
    dataLabels: {
      enabled: true
    }
  };
  workerId: string;
  pastEvents: any[] = [];
  currentEvents: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,private eventservice: EventService , private authservice: AuthServiceService) {}
  navigateToEventDetails(eventId: number) {
    this.router.navigate(['/events', eventId], { fragment: 'details-section' });
  }
  ngOnInit(): void {
    
    this.workerId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadEvents();
    
    this.worker_id = this.authservice.getUserId();
    this.eventservice.getWorkerJoinedEvents(this.worker_id).subscribe(
      (data: any) => {
        this.currentEvents = data || [];
        this.sortEventsByDeadline(); // Sort events after fetching them
      },
      (error) => {
        console.error('Error fetching worker event details', error);
      }
    );
  
    
    this.eventservice.getworkerjoinedEvent().subscribe(
      (data: Event[]) => {
        this.dataSourceworker.data = data;
        this.dataSourceworker.paginator = this.paginatorWorker;
      },
      (error) => {
        console.error('Error fetching workers with events', error);
      }
    ); 


    this.eventservice.getWorkerStatistics().subscribe(
      data => {
        this.dataSource.data = data.workers;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Error fetching worker statistics:', error);
      }
    );
   
    this.eventservice.getEventStatistics().subscribe(
      data => {
        // Assume data is an array of events with the fields: title, acceptance_ratio, etc.
        this.dataSourceevent.data = data.map((event: EventStatistics) => ({
          title: event.title,
          acceptance_ratio: event.acceptance_ratio,
          participation_rate: event.participation_rate, 
          total_submissions : event.total_submissions,
          
          // Ajoutez d'autres champs si nécess,aire
        }));
        this.dataSourceevent.paginator = this.paginatorEvents;
      },
      error => {
        console.error('Error fetching event statistics:', error);
      }
    ); 
    
    
    this.loadTotalUsers();
    this.loadTotalEventsToday();
    this.loadEventStatistics();
    this.loadWorkerStatistics();
    this.loadParticipationRate();
    this.fetchEventStatistics();
    this.loadRequesterStat();
    this.loadWorkerStat();
    this.sortEventsByDeadline();
    
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
  isAdmin(): boolean {
    return this.authservice.getRole() === 'Admin';
  }
  isWorker(): boolean {
    return this.authservice.getRole() === 'Worker';
  }

  isRequester(): boolean {
    return this.authservice.getRole() === 'Requester';
  }
  isPatient(): boolean {
    return this.authservice.getRole() === 'Patient';
  }
    
fetchEventStatistics(): void { 
    this.eventservice.getRequesterEventStatistics().subscribe(
      data => {
        // Assuming data contains the event_statistics array
        this.dataSourceRequester.data = data.event_statistics; 
        this.dataSourceRequester.paginator = this.paginatorRequester;
      },
      error => console.error('Error fetching event statistics', error)
    );
  }

  loadTotalUsers(): void {
    this.eventservice.getTotalUsers().subscribe(
      data => {this.totalUsers = data.totalUsers, this.total_workers =data.totalWorkers , this.total_requester=data.totalRequesters},
      error => console.error('Error fetching total users', error)
    );
  }
  
  loadRequesterStat(): void {
    this.eventservice.getRequesterEventStatistics().subscribe(
      data => {this.total_events = data.global_statistics.total_events, this.total_workers_joined =data.global_statistics.total_workers_joined , this.total_photos_requested=data.global_statistics.total_photos_requested,
        this.total_photos_received = data.global_statistics.total_photos_received , this.acceptance_ratio = data.global_statistics.acceptance_ratio,
        this.total_rewards = data.global_statistics.total_rewards, this.total_data_saving= data.global_statistics.total_data_saving
      },
      error => console.error('Error fetching total users', error)
    );
  }
  getTimeLeft(deadline: string): string {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 'Expired';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    let timeLeft = '';
    if (days > 0) timeLeft += `${days} days `;
    if (hours > 0) timeLeft += `${hours} hours `;
    if (minutes > 0) timeLeft += `${minutes} minutes`;

    return timeLeft.trim() || 'Just now';
  }

  // Sort the events by deadline, soonest first
  sortEventsByDeadline() {
    const now = new Date();
  
    // Separate events into non-expired and expired
    const [nonExpiredEvents, expiredEvents]: [Event[], Event[]] = this.currentEvents.reduce(
      ([nonExpired, expired]: [Event[], Event[]], event: Event) => {
        const deadline = new Date(event.deadline);
        if (deadline < now) {
          expired.push(event);
        } else {
          nonExpired.push(event);
        }
        return [nonExpired, expired];
      },
      [[], []] // Initial value is a tuple with two empty arrays
    );
  
    // Sort non-expired events by deadline from closest to furthest
    nonExpiredEvents.sort((a: Event, b: Event) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  
    // Combine non-expired and expired events
    this.currentEvents = [...nonExpiredEvents, ...expiredEvents];
  }
  

  loadWorkerStat(): void {
    this.eventservice.getWrokerEventStatistics().subscribe(
      data => {this.total_eventsJoined = data.total_events_joined,
         this.total_imageSubmitted =data.total_images_submitted , 
         this.total_imageApproved=data.total_images_approved,
        this.acceptance_ratioWorker = data.acceptance_ratio ,
         this.acceptance_ratio = data.acceptance_ratioWorker,
         this.totalEarning = data.total_earnings,
         this.total_data_consumed = data.total_data_consumed
      },
      error => console.error('Error fetching total event', error)
    );
  }
   
  loadTotalEventsToday(): void {
    this.eventservice.getEvents().subscribe(
      data => {
        this.totalEventsToday = data.total_events_today;
        this.totalevent = data.total_events;
      },
      error => console.error('Error fetching total events today', error)
    );
  }

  loadSubmissionCount(eventId: number): void {
    this.eventservice.getSubmissionCount(eventId).subscribe(
      data => this.submissionCount = data.submissionCount,
      error => console.error('Error fetching submission count', error)
    );
  }
 
  loadEventStatistics(): void {
    this.eventservice.getEventStatistics().subscribe(
      (data: EventStatistic[]) => {
        this.eventStatistics = data;
        this.updateChartOptions();
      },
      error => console.error('Error fetching event statistics', error)
    );
  }
  updateChartOptions(): void {
    this.chartOptions.series = this.eventStatistics.map(event => ({
      name: event.title,
      data: [event.participation_rate ?? 0,  0] // Provide default values
    }));

    this.chartOptions.xaxis.categories = this.eventStatistics.map(event => event.title);
    // No need to reset optional properties if they already have defaults
  }

  loadWorkerStatistics(): void {
    this.eventservice.getWorkerStatistics().subscribe(
      data => this.workerStatistics = data,
      error => console.error('Error fetching worker statistics', error)
    );
  }

  loadParticipationRate(): void {
    this.eventservice.getParticipationRate().subscribe(
      data => this.participationRate = data.participationRate,
      error => console.error('Error fetching participation rate', error)
    );
  }

  
 

  initMap(): void {
    this.map = L.map('map').setView([34.7359, 10.7617], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  loadEvents(): void {
   
  
    this.eventservice.getAllEvents().subscribe((events: Event[]) => {
      if (!this.map) {
        console.error('molkaaaaaaaaaaaaaaaaaaaa');
        return;
      }
  
      // Supprimer les anciens marqueurs de la carte
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
  
      // Définir l'icône du marqueur
      const markerIcon = L.icon({
        iconUrl: 'assets/images/marker.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });
  
      // Ajouter de nouveaux marqueurs à la carte
      events.forEach(event => {
        if (event.location) {
          L.marker([event.location.lat, event.location.lng], { icon: markerIcon })
            .addTo(this.map)
            .bindPopup(`<b>${event.title}</b><br>Latitude: ${event.location.lat}<br>Longitude: ${event.location.lng}`);
        }
      });
    });
  }
}

