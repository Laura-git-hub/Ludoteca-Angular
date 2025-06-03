/*import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import {Prestamo } from './model/Prestamo';
import { PrestamoPage } from './model/PrestamoPage';
import { HttpClient} from '@angular/common/http';
import { PRESTAMO_DATA } from './model/mock-prestamo';
import { PRESTAMO_DATA_LIST } from './model/mock-prestamos-list';

@Injectable({
    providedIn: 'root',
})
export class PrestamoService {
    constructor(private http: HttpClient) {}
    private baseUrl = 'http://localhost:8080/prestamo';

    getPrestamo(pageable: Pageable): Observable<PrestamoPage> {
        //return of(PRESTAMO_DATA);
        return this.http.post<PrestamoPage>(this.baseUrl, { pageable: pageable });
       
    }

    savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
        //return of(null);
        const { id } = prestamo;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Prestamo>(url, prestamo);
    }

    deletePrestamo(idPrestamo: number): Observable<void> {
        //return of(null);
        return this.http.delete<void>(`${this.baseUrl}/${idPrestamo}`);
    }
      getAllPrestamos(): Observable<Prestamo[]> {
            //return of(PRESTAMO_DATA_LIST);
            return this.http.get<Prestamo[]>(this.baseUrl)
    }
}*/