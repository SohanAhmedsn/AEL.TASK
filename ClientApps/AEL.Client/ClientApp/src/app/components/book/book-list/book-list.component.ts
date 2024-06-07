import { Book } from './../../../models/data/book';
import { DatePipe } from '@angular/common';
import { BookServices } from './../../../services/data/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { NotifyService } from 'src/app/services/data/notify.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  book: Book[] = [];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource(this.book);
  columnList = ['title', 'description', 'dueDate', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private bookService: BookServices,
    private notifySvc: NotifyService,
    private matDialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  confirmDelete(item: Book) {
    this.matDialog
      .open(ConfirmDialogComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe({
        next: (r) => {
          if (r) {
            this.bookService.delete(Number(item.id)).subscribe({
              next: (r) => {
                this.dataSource.data = this.dataSource.data.filter(
                  (x) => x.id != item.id
                );
              },
              error: (err) => {
                this.notifySvc.notify('Failed to delete', 'DISMISS');
              },
            });
          }
        },
      });
  }
  ngOnInit(): void {
    this.bookService.get().subscribe({
      next: (r) => {
        this.book = r;
        this.dataSource.data = this.book;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource.data);
        console.log(this.book);
      },
      error: (err) => {
        this.notifySvc.notify('Failed to Load Data', 'DISMISS');
        console.log(err);
      },
    });
  }
}

// id?: number
// title?: string;
// description?: string;
// dueDate?: Date | string;
// status?: boolean
