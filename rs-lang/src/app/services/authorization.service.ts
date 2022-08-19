import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { INewUser } from '../interfaces/interfaces';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private apiService: ApiService) {}

  createUser(newUSer: INewUser) {
    this.apiService.post('users', newUSer).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        if (err.status === 417) {
          alert('use with such email already exists');
        }
      },
    });
  }
}
