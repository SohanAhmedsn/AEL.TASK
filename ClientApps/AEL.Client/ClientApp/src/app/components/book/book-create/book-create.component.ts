import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/data/book';
import { BookServices } from 'src/app/services/data/book.service';
import { NotifyService } from 'src/app/services/data/notify.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {
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
    private notifySvc: NotifyService
  ) {}

  get f() {
    return this.bookForm.controls;
  }
  save() {
    if (this.bookForm.invalid) return;
    Object.assign(this.book, this.bookForm.value);
    this.bookService.post(this.book).subscribe({
      next: (r) => {
        //console.log(r);
        this.notifySvc.notify('Data saved successfully', 'DISMISS');
        this.book = {};
        this.bookForm.reset({});
        this.bookForm.markAsPristine();
        this.bookForm.markAsUntouched();
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.notify('Failed to save data', 'DISMISS');
      },
    });
  }
}
