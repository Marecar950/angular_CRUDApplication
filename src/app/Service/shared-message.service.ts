import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedMessageService {
  private message: string | null = null;

  setMessage(message: string) {
    this.message = message;
  }

  getMessage(): string | null {
    return this.message;
  }

}
