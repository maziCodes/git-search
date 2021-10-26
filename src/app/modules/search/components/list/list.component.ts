import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Search } from 'src/app/models/search';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() users: Observable<Array<User>> = new BehaviorSubject([]);
  @Input() totalCount: number = 0;
  @Input() searchList: Observable<Search> = new BehaviorSubject({} as Search);
  @Input() currentPage: number = 1;
  @Output() onPageChanged: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

  form: FormGroup;
  perPage: number = 10;
  perPages: Array<number> = [10, 20, 30, 50, 100];


  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      perPage: [this.perPage]
    })

    this.form.controls.perPage.valueChanges.subscribe((v) => {
      this.perPage = v;
      this.pageChanged({page: this.currentPage, itemsPerPage: this.perPage});
    })
   }

  ngOnInit(): void {
  }

  pageChanged($event: PageChangedEvent) {
    console.log($event);
    this.onPageChanged.emit($event);
  }

}
