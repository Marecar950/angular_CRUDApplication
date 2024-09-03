import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { WebApiService } from '../Service/web-api.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  clientId: any;
  clientDetails : any= [];

  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['clientId'];
    this.getClientDetailsById();
  }

  getClientDetailsById() {
    this.httpProvider.getClientDetailsById(this.clientId).subscribe((data : any) => {
    this.clientDetails = data;
    console.log(data);
    });
  }

}
