
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private idSubject = new BehaviorSubject<string | undefined>(undefined);
  id$ = this.idSubject.asObservable();

  setId(newId: string) {
    this.idSubject.next(newId); // تعيين id الجديد
  }
}