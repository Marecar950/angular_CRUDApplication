import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { SharedMessageService } from '../Service/shared-message.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm: clientForm = new clientForm();

  @ViewChild("clientForm")
  clientForm!: NgForm; 
  isSubmitted: boolean = false;
  error: string | null = null;
  
  constructor(private router: Router, 
              private httpProvider: HttpProviderService, 
              private sharedMessageService: SharedMessageService
            ) { }

  ngOnInit(): void { }

  AddClient(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveClient(this.addClientForm).subscribe(async data => {
        console.log(data);
        this.sharedMessageService.setMessage(data.message);
        this.error = data.error;

        if (data.message) {
          this.router.navigate(['/Home']);
        }
      })
    }
  }

}

export class clientForm {
  lastname: string = "";
  firstname: string = "";
  dateOfBirth: string = "";
  email: string = "";
  phone: string = "";
}
