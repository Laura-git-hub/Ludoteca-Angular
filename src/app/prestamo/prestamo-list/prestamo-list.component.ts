import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { PrestamoService } from '../prestamo.service';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';

import { Prestamo } from '../model/Prestamo';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './prestamo-list.component.html',
  styleUrls: ['./prestamo-list.component.scss']
})
export class PrestamoListComponent implements OnInit {
  prestamoList: Prestamo[] = [];
  displayedColumns: string[] = [
    'id',
    'game',
    'client',
    'fecha_prestamo',
    'fecha_devolucion',
    'actions',
  ];

  games: Game[] = [];
  clients: Client[] = [];

  filterGame: Game | null = null;
  filterClient: Client | null = null;
  filterDate: Date | null = null;

  pageNumber = 0;
  pageSize = 5;
  totalElements = 0;

  showNuevoPrestamo = false;
  nuevoPrestamo: Partial<Prestamo> = {
    id: null,
    client: null,
    game: null,
    fecha_prestamo: null,
    fecha_devolucion: null,
  };

  constructor(
    private prestamoService: PrestamoService,
    private gameService: GameService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadGames();
    this.loadClients();
    this.loadPage();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe(games => (this.games = games));
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => (this.clients = clients));
  }

  loadPage(event?: PageEvent): void {
    if (event) {
      console.log('Evento paginador recibido:', event);
      this.pageSize = event.pageSize;
      this.pageNumber = event.pageIndex;
    } else {
      console.log('loadPage llamado sin evento, usando:',
        'pageNumber =', this.pageNumber,
        'pageSize =', this.pageSize);
    }

    const gameId = this.filterGame ? this.filterGame.id : undefined;
    const clientId = this.filterClient ? this.filterClient.id : undefined;
    const date = this.filterDate ? this.filterDate.toISOString().substring(0, 10) : undefined;

    console.log('Llamando a getPrestamosFiltered con filtros:', {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      gameId,
      clientId,
      date,
    });

    this.prestamoService
      .getPrestamosFiltered(
        { pageNumber: this.pageNumber, pageSize: this.pageSize, sort: [] },
        gameId,
        clientId,
        date
      )
      .subscribe({
        next: (data) => {
          console.log('Respuesta del backend:', data);
          // Validar si la respuesta tiene paginación o solo un array
          if (Array.isArray(data)) {
            this.prestamoList = data;
            this.totalElements = data.length;
            this.pageNumber = 0;
            // pageSize queda igual
          } else {
            this.prestamoList = data.content || [];
            this.totalElements = data.totalElements || 0;
            this.pageNumber = data.pageable?.pageNumber ?? 0;
            this.pageSize = data.pageable?.pageSize ?? this.pageSize;
          }

          console.log('Datos actualizados en componente:', {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            totalElements: this.totalElements,
            prestamoListLength: this.prestamoList.length,
          });
        },
        error: (error) => {
          console.error('Error al obtener datos:', error);
        }
      });
  }

  applyFilters(): void {
    this.pageNumber = 0;
    this.loadPage();
  }

  clearFilters(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;
    this.pageNumber = 0;
    this.loadPage();
  }

  toggleNuevoPrestamo(): void {
    this.showNuevoPrestamo = !this.showNuevoPrestamo;

    if (this.showNuevoPrestamo) {
      this.nuevoPrestamo = {
        id: null,
        client: null,
        game: null,
        fecha_prestamo: null,
        fecha_devolucion: null,
      };
    }
  }

  isNuevoPrestamoValid(): boolean {
    const p = this.nuevoPrestamo;
    return (
      !!p.client &&
      !!p.game &&
      !!p.fecha_prestamo &&
      !!p.fecha_devolucion &&
      p.fecha_prestamo <= p.fecha_devolucion
    );
  }

  saveNuevoPrestamo(): void {
    if (!this.isNuevoPrestamoValid()) return;

    const prestamoToSave = {
      ...this.nuevoPrestamo,
      client: { id: this.nuevoPrestamo.client?.id },
      game: { id: this.nuevoPrestamo.game?.id },
    };

    this.prestamoService.savePrestamo(prestamoToSave as Prestamo).subscribe({
      next: () => {
        this.toggleNuevoPrestamo();
        this.loadPage();
      },
      error: err => alert('Error guardando el préstamo: ' + err.message),
    });
  }

  cancelNuevoPrestamo(): void {
    this.showNuevoPrestamo = false;
  }

  deletePrestamo(prestamo: Prestamo): void {
    if (confirm('¿Seguro que deseas eliminar este préstamo?')) {
      this.prestamoService.deletePrestamo(prestamo.id!).subscribe(() => {
        this.loadPage();
      });
    }
  }

  getGameTitle(gameId: number | undefined): string {
    if (!gameId) return 'Desconocido';
    const game = this.games.find(g => g.id === gameId);
    return game ? game.title : 'Desconocido';
  }

  getClientName(clientId: number | undefined): string {
    if (!clientId) return 'Desconocido';
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : 'Desconocido';
  }
}
