import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './prestamo-list.component.html',
  styleUrl: './prestamo-list.component.scss',
})
export class PrestamoListComponent implements OnInit {
[x: string]: any;
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'game', 'client', 'fecha_prestamo', 'fecha_devolucion', 'action'];

  // Filtros
  filterControl = new FormControl('');
  clientFilterControl = new FormControl('');
  dateFilterControl = new FormControl<Date | null>(null);

  filterTitle: string = '';
  filterClient: string = '';
  filterDate: Date | null = null;

  constructor(private prestamoService: PrestamoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPage();

    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterTitle = value || '';
      });

    this.clientFilterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filterClient = value || '';
      });

    this.dateFilterControl.valueChanges
      .subscribe(value => {
        this.filterDate = value;
      });
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{ property: 'id', direction: 'ASC' }],
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

  get filteredPrestamos(): Prestamo[] {
    const titleFilter = this.filterTitle.toLowerCase().trim();
    const clientFilter = this.filterClient.toLowerCase().trim();
    const dateFilter = this.filterDate;

    return this.dataSource.data.filter(prestamo =>
      prestamo?.game?.title?.toLowerCase().includes(titleFilter) &&
      prestamo?.client?.name?.toLowerCase().includes(clientFilter) &&
      (!dateFilter || new Date(prestamo.fecha_prestamo).toDateString() === dateFilter.toDateString())
    );
  }

  trackById(index: number, item: Prestamo): number {
    return item.id;
  }

  
  onCleanFilter(): void {
    this.filterTitle = null;
    this.filterCategory = null;
    this.onSearch();
}

onSearch(): void {
    const title = this.filterTitle;
    const categoryId =
        this.filterCategory != null ? this.filterCategory.id : null;

    this.gameService
        .getGames(title, categoryId)
        .subscribe((games) => (this.games = games));
}

  createPrestamo() {
    const dialogRef = this.dialog.open(PrestamoEditComponent, { data: {} });
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }

  editPrestamo(prestamo: Prestamo) {
    const dialogRef = this.dialog.open(PrestamoEditComponent, { data: { prestamo } });
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }

  deletePrestamo(prestamo: Prestamo) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar préstamo',
        description: 'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.prestamoService.deletePrestamo(prestamo.id).subscribe(() => this.ngOnInit());
      }
    });
  }
}
