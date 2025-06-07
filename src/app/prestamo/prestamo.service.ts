import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from './model/Prestamo';
import { PrestamoPage } from './model/PrestamoPage';
import { Pageable } from '../core/model/page/Pageable';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private baseUrl = 'http://localhost:8080/prestamo';

  constructor(private http: HttpClient) {}

  getPrestamosFiltered(
    pageable: Pageable,
    gameId?: number,
    clientId?: number,
    date?: string
  ): Observable<PrestamoPage> {
    let params = new HttpParams()
      .set('pageNumber', pageable.pageNumber.toString())
      .set('pageSize', pageable.pageSize.toString());

    if (gameId != null) params = params.set('gameId', gameId.toString());
    if (clientId != null) params = params.set('clientId', clientId.toString());
    if (date) params = params.set('date', date);

    return this.http.get<PrestamoPage>(this.baseUrl, { params });
  }

  deletePrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
    if (prestamo.id) {
      return this.http.put<Prestamo>(`${this.baseUrl}/${prestamo.id}`, prestamo);
    } else {
      return this.http.post<Prestamo>(this.baseUrl, prestamo);
    }
  }
}
