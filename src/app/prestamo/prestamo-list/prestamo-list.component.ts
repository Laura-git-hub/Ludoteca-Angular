import { FormsModule } from "@angular/forms";
import { Prestamo } from "../model/Prestamo";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Game } from "../../game/model/Game";
import { Client } from "../../client/model/Client";
import { PrestamoService } from "../prestamo.service";
import { GameService } from "../../game/game.service";
import { ClientService } from "../../client/client.service";

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
  styleUrls: ['./prestamo-list.component.scss'],
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
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
  }

  loadPage(event?: PageEvent): void {
    if (event) {
      this.pageSize = event.pageSize;
      this.pageNumber = event.pageIndex;
    }

    const gameId = this.filterGame?.id;
    const clientId = this.filterClient?.id;
    const date = this.filterDate?.toISOString().substring(0, 10);

    this.prestamoService
      .getPrestamosFiltered(
        { pageNumber: this.pageNumber, pageSize: this.pageSize, sort: [] },
        gameId,
        clientId,
        date
      )
      .subscribe({
        next: (data) => {
           console.log('Datos recibidos:', data);
          if (Array.isArray(data)) {
            this.prestamoList = data;
            this.totalElements = data.length;
            this.pageNumber = 0;
          } else {
            this.prestamoList = data.content || [];
            this.totalElements = data.totalElements || 0;
            this.pageNumber = data.pageable?.pageNumber ?? 0;
            this.pageSize = data.pageable?.pageSize ?? this.pageSize;
          }
        },
        error: (error) => console.error('Error al cargar préstamos:', error),
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
    this.applyFilters();
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

  cancelNuevoPrestamo(): void {
    this.showNuevoPrestamo = false;
  }

  isNuevoPrestamoValid(): boolean {
    const p = this.nuevoPrestamo;
    return !!p.client && !!p.game && !!p.fecha_prestamo && !!p.fecha_devolucion && p.fecha_prestamo <= p.fecha_devolucion;
  }

  saveNuevoPrestamo(): void {
    if (!this.isNuevoPrestamoValid()) return;

    const prestamoToSave: Prestamo = {
      ...this.nuevoPrestamo,
      client: { id: this.nuevoPrestamo.client?.id },
      game: { id: this.nuevoPrestamo.game?.id },
    } as Prestamo;

    this.prestamoService.savePrestamo(prestamoToSave).subscribe({
      next: () => {
        this.loadPage();
        this.cancelNuevoPrestamo();
      },
      error: (error) => console.error('Error al guardar préstamo:', error),
    });
  }

  deletePrestamo(prestamo: Prestamo): void {
    if (confirm(`¿Seguro que deseas eliminar el préstamo #${prestamo.id}?`)) {
      this.prestamoService.deletePrestamo(prestamo.id).subscribe({
        next: () => this.loadPage(),
        error: (error) => console.error('Error al eliminar préstamo:', error),
      });
    }
  }
}
