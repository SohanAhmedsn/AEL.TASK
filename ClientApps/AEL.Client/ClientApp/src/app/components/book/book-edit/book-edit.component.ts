import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/data/book';
import { BookServices } from 'src/app/services/data/book.service';
import { NotifyService } from 'src/app/services/data/notify.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  book: Book = {};
  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
    ]),
    dueDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  constructor(
    private bookService: BookServices,
    private notifySvc: NotifyService,
    private actvatedRoute: ActivatedRoute
  ) {}

  get f() {
    return this.bookForm.controls;
  }
  save() {
    if (this.bookForm.invalid) return;
    Object.assign(this.book, this.bookForm.value);
    this.bookService.put(this.book).subscribe({
      next: (r) => {
        this.notifySvc.notify('Data updated successfully', 'DISMISS');
      },
      error: (err) => {
        this.notifySvc.notify('Failed to update data', 'DISMISS');
      },
    });
  }
  ngOnInit(): void {
    let id: number = this.actvatedRoute.snapshot.params['id'];
    this.bookService.getById(id).subscribe({
      next: (r) => {
        this.book = r;
        this.bookForm.patchValue(this.book);
      },
      error: (err) => {
        console.log(err.message || err);
        this.notifySvc.notify('Failed to load department', 'DISMISS');
      },
    });
  }
}
