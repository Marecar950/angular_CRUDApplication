import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { SharedMessageService } from '../Service/shared-message.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  editClientForm: clientForm = new clientForm();

  @ViewChild("clientForm")
  clientForm!: NgForm;

  isSubmitted: boolean = false;
  clientId: any;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private httpProvider: HttpProviderService,
              private sharedMessageService: SharedMessageService) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['clientId'];
    this.getClientDetailsById();
  }
  getClientDetailsById() {
    this.httpProvider.getClientDetailsById(this.clientId).subscribe((data: any) => {
      this.editClientForm.lastname = data.lastname;
      this.editClientForm.firstname = data.firstname;
      this.editClientForm.dateOfBirth = data.dateOfBirth;
      this.editClientForm.email = data.email;
      this.editClientForm.phone = data.phone;
    })
  }

  EditClient(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      const updatedClientData = {
        ...this.editClientForm,
        id: this.clientId
      };

      this.httpProvider.updateClientById(this.clientId, updatedClientData).subscribe(async data => {
        console.log(data.message);
        this.sharedMessageService.setMessage(data.message);
        this.router.navigate(['/Home']);
      })
    }
  }

}

export class clientForm {
  id: number = 0;
  lastname: string = "";
  firstname: string = "";
  dateOfBirth: string = "";
  email: string = "";
  phone: string = "";
}
