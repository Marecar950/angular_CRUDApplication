import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpProviderService } from '../Service/http-provider.service';
import { SharedMessageService } from '../Service/shared-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  message: string | null = null;


  @ViewChild('closebutton') closebutton!: ElementRef<HTMLButtonElement>;
  clientsList: any[] = [];
  filteredClients: any[] = [];
  clientToDelete: any;

  constructor(private router: Router, 
              private httpProvider : HttpProviderService, 
              private datePipe: DatePipe,
              private sharedMessageService: SharedMessageService) { }

  ngOnInit(): void {
    this.getAllClients();
    this.message = this.sharedMessageService.getMessage();
  }
  async getAllClients() {
    this.httpProvider.getAllClients().subscribe((data : any) => {
    this.clientsList = data;
    this.filteredClients = data;
    });
  }

  async getClientsByLastname(clientLastname: string) {
    if (clientLastname.trim() === '') {
      this.getAllClients();
    } else {
        this.httpProvider.getClientsByLastname(clientLastname).subscribe((data : any) => {
        this.filteredClients = data;
      });
    }
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  AddClient() {
    this.router.navigate(['AddClient']);
  }

  openDeleteModal(client: any) {
    this.clientToDelete = client;
  }

  deleteClient() {
    if (this.clientToDelete) {
      this.httpProvider.deleteClientById(this.clientToDelete.id).subscribe((data : any) => {
          var resultData = data.body;
          console.log(resultData.message);
          this.message = resultData.message;
          this.clientsList = this.clientsList.filter(client => client.id !== this.clientToDelete.id);
          this.filteredClients = this.clientsList;
          this.closebutton.nativeElement.click();
      });
    }
  }
  
  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value;
    console.log(filterValue);
    this.getClientsByLastname(filterValue);
  }
}  
