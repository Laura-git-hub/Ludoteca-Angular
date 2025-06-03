/*import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
//import { PrestamoItemComponent } from './prestamo-item/prestamo-item.component';

@Component({
    selector: 'app-prestamo-list',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule,MatPaginatorModule, FormsModule, MatFormFieldModule, MatInputModule,MatSelectModule],
    templateUrl: './prestamo-list.component.html',
    styleUrl: './prestamo-list.component.scss',
})
export class PrestamoListComponent implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;
    games:Game[];
    clients:Client[];
    filterGame: Game;
    filterClien: Client;

    dataSource = new MatTableDataSource<Prestamo>();
    displayedColumns: string[] = ['id', 'fecha_prestamo', 'fecha_devolucion', 'game', 'client', 'action'];

    constructor(private prestamoService: PrestamoService, 
        private clientService: ClientService,
        private gameService:GameService,
        public dialog: MatDialog) {}

    ngOnInit(): void { 
        /*this.prestamoService.getPrestamo().subscribe((prestamos)) => (this.prestamos = prestamos));

        this.prestamoService
        .getClients()
        .subscribe((clients)) => (this.clients = clients));

        .getGames()
        .subscribe((games)) => (this.games = games));
    
        
        this.loadPage();
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        this.prestamoService.getPrestamo(pageable).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createPrestamo() {
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editPrestamo(author: Prestamo) {
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: { prestamo: Prestamo },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deletePrestamo(prestamo: Prestamo) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar préstamo',
                description:
                    'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.prestamoService.deletePrestamo(prestamo.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}*/