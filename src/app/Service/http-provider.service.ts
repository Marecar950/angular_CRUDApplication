import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://127.0.0.1:8000";

var httpLink = {
  getAllClients: apiUrl + "/api/clients",
  getClientsByLastname: (clientLastname: string) => `${apiUrl}/api/clients/search/${clientLastname}`,
  getClientDetailsById: (clientId: number) => `${apiUrl}/api/client/${clientId}`,
  saveClient: apiUrl + "/api/client/create",
  updateClientById: (clientId: number) => `${apiUrl}/api/client/update/${clientId}`,
  deleteClientById: (clientId: number) => `${apiUrl}/api/client/delete/${clientId}`
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllClients(): Observable<any> {
    return this.webApiService.get(httpLink.getAllClients);
  }

  public getClientsByLastname(clientLastname: string): Observable<any> {
    return this.webApiService.get(httpLink.getClientsByLastname(clientLastname));
  }

  public getClientDetailsById(clientId: number): Observable<any> {
    return this.webApiService.get(httpLink.getClientDetailsById(clientId));
  }

  public saveClient(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveClient, model);
  }

  public updateClientById(clientId: number, clientData: any): Observable<any> {
    return this.webApiService.put(httpLink.updateClientById(clientId), clientData);
  }

  public deleteClientById(clientId: number): Observable<any> {
    return this.webApiService.delete(httpLink.deleteClientById(clientId));
  }
}
