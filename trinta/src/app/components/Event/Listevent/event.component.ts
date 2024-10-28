import { joined_patients } from './../../../core/models/joined_patients';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
import { EventService } from '../../../core/Services/event.service';
import { Event } from '../../../core/models/event';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Capacitor} from "@capacitor/core";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  displayedColumns: string[] = ['event', 'price', 'host', 'startTime', 'eventDate' , 'status'];
  displayedColumns1: string[] = ['Event', 'Requester', 'Created at', 'startdate', 'Deadline', 'Reward'];
  dataSource = new MatTableDataSource<any>([]);
  requesterEvents: any[] = [];  // Store requester's events
  selectedTabDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  workerId: any;
  selectedTab: string = 'all'; // Default to "All" tab
  requesters: any[] = [];
  selectedEventType: null; // This will store the selected event type
  selectedRequester: null;
  selectedPriceRange: null;
  selectedPhotoRange: null;
  // private fb: FormBuilder;
  dateForm: FormGroup;
  selectedDateRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  isMobile: boolean;
  constructor(private authServiceService: AuthServiceService,
              private eventService: EventService,
              private fb: FormBuilder
  ) {
    this.workerId = this.authServiceService.getUserId();
    this.isMobile = Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android';

  }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      dateRange: this.fb.group({
        start: [''],
        end: ['']
      })
    });
    // Subscribe to value changes on the date range form group
    this.dateForm.get('dateRange')?.valueChanges.subscribe(value => {
      this.selectedDateRange.start = value.start;
      this.selectedDateRange.end = value.end;
    });
    if (this.isRequester()) {
      this.loadRequesterEvents(this.selectedTab);
    }else if(this.isPatient()){
      this.loadApprovedRequesters()

      this.loadWorkerJoinedEvents(localStorage.getItem('id'),this.selectedTab)
    }else{

      this.loadApprovedRequesters()
      this.loadEvents(this.selectedTab);  // Load initial tab's data
    }
  }
  loadApprovedRequesters(): void {
    this.eventService.getApprovedRequestersNmes().subscribe(
      (data) => {
        console.log(data)
        this.requesters = data;
      },
      (error) => {
        console.error('Error fetching approved requesters', error);
      }
    );
  }
  loadEvents(tab: string): void {
    let eventObservable;

    if (tab === 'all') {
      eventObservable = this.eventService.getAllEvents();
    } else if (tab === 'in-progress') {
      eventObservable = this.eventService.getUpcomingEvents();
    } else if (tab === 'finished') {
      eventObservable = this.eventService.getPastEvents();
    }

    eventObservable?.subscribe(
      (events) => {
        this.selectedTabDataSource.data = events;
        this.selectedTabDataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel.toLowerCase().replace(' ', '-');
    this.selectedTab = tabLabel;
    if (this.isRequester()) {
      this.loadRequesterEvents(this.selectedTab);
    }else if(this.isPatient()){
      this.loadWorkerJoinedEvents(localStorage.getItem('id'),this.selectedTab)
    }else{

      this.loadApprovedRequesters()
      this.loadEvents(this.selectedTab);  // Load initial tab's data
    }
  }


  loadWorkerJoinedEvents(patient_id: any, tab: string): void {
    console.log(patient_id)
    let eventObservable;

    if (tab === 'all') {
      eventObservable = this.eventService.getWorkerJoinedEvents(patient_id);
    } else if (tab === 'in-progress') {
      eventObservable = this.eventService.getWorkerJoinedUpcomingEvents(patient_id);
    } else if (tab === 'finished') {
      eventObservable = this.eventService.getWorkerJoinedPastEvents(patient_id);
    }

    eventObservable?.subscribe(
      (events: Event[]) => {
        // Assuming you want to filter based on deadline and approval status only for 'in-progress'
        if (tab === 'in-progress') {
          const filteredEvents = events.filter(event =>
            event.joined_patients.some(patient => patient.status === 'APPROVED') &&
            new Date(event.deadline) >= new Date()
          );
          this.selectedTabDataSource.data = filteredEvents;
        } else {
          console.log(events)
          this.selectedTabDataSource.data = events;
        }
        this.selectedTabDataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error(`Error fetching ${tab} events for worker`, error);
      }
    );
  }


  loadRequesterEvents(tab: string): void {
    let eventObservable;

    if (tab === 'all') {
      eventObservable = this.eventService.getRequesterEvents();
    } else if (tab === 'in-progress') {
      eventObservable = this.eventService.getRequesterUpcomingEvents();
    } else if (tab === 'finished') {
      eventObservable = this.eventService.getRequesterPastEvents();
    }

    eventObservable?.subscribe(
      (events) => {
        this.selectedTabDataSource.data = events;
        this.selectedTabDataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching requester events', error);
      }
    );
  }


  isRequester(): boolean {
    return this.authServiceService.getRole() === 'Requester';
  }

  isWorker(): boolean {
    return this.authServiceService.getRole() === 'Worker';
  }
  isPatient(): boolean {
    return this.authServiceService.getRole() === 'Patient';
  }
  isDoctor(): boolean {
    return this.authServiceService.getRole() === 'Doctor';
  }
  isAdmin(): boolean {
    return this.authServiceService.getRole() === 'Admin';
  }

  clearEventTypes() {
    this.selectedEventType = null;
  }

  clearRequester() {
    this.selectedRequester = null;
  }

  clearPriceRange() {
    this.selectedPriceRange = null;
  }

  clearPhotoRange() {
    this.selectedPhotoRange = null;
  }

  clearDateRange(): void {
    this.dateForm.get('dateRange')?.reset();
    this.selectedDateRange = { start: null, end: null };
  }

  clearAllFilters() {
    this.clearEventTypes();
    this.clearRequester();
    this.clearPriceRange();
    this.clearPhotoRange();
    this.clearDateRange();
  }
  search() {
    console.log('Selected Event Type:', this.selectedEventType);
    console.log('Selected Requester:', this.selectedRequester);
    console.log('Selected Price Range:', this.selectedPriceRange);
    console.log('Selected Max Photos Range:', this.selectedPhotoRange);

    const requesterId = localStorage.getItem('id');
    const workerId = localStorage.getItem('id');
    const dateRange = this.dateForm.get('dateRange')?.value;

    let startDate = null;
    let endDate = null;

    if (dateRange.start && dateRange.start instanceof Date) {
      startDate = dateRange.start.toISOString().split('T')[0];
    } else if (dateRange.start && typeof dateRange.start === 'string') {
      startDate = dateRange.start;
    }

    if (dateRange.end && dateRange.end instanceof Date) {
      endDate = dateRange.end.toISOString().split('T')[0];
    } else if (dateRange.end && typeof dateRange.end === 'string') {
      endDate = dateRange.end;
    }

    console.log('Selected Start Date:', startDate);
    console.log('Selected End Date:', endDate);

    const filters: EventFilters = {
      selectedEventType: this.selectedEventType || null,
      selectedRequester: this.selectedRequester || null,
      selectedPriceRange: this.selectedPriceRange || null,
      selectedPhotoRange: this.selectedPhotoRange || null,
      selectedDateRange: {
        start: startDate,
        end: endDate,
      }
    };

    if (this.isWorker()) {
      filters.workerId = workerId || null;
    }
    if (this.isRequester()) {
      filters.requesterId = requesterId || null;
    }

    this.eventService.getFilteredEvents(filters, this.selectedTab).subscribe(
      (data) => {
        this.selectedTabDataSource.data = data;
        console.log('Filtered Events:', data);
      },
      (error) => {
        console.error('Error fetching filtered events', error);
      }
    );
  }
}
interface EventFilters {
  selectedEventType: string | null;
  selectedRequester: string | null;
  selectedPriceRange: string | null;
  selectedPhotoRange: string | null;
  selectedDateRange: {
    start: string | null;
    end: string | null;
  };
  workerId?: string | null;
  requesterId?: string | null;
}
