import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Search } from 'src/app/models/search';
import { User } from 'src/app/models/user';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  searchList: Observable<Search> = new BehaviorSubject({} as Search);
  users: BehaviorSubject<Array<User>> = new BehaviorSubject([] as Array<User>);
  totalCount: number = 0;
  perPage: number = 10;
  page: number = 1;


  constructor(
    private fb: FormBuilder,
    private searchService: SearchService
  ) { 
    this.form = fb.group({
      search: ['']
    })
  }

  ngOnInit(): void {
  }

  pageChanged($event: PageChangedEvent) {
    this.page = $event.page;
    this.perPage = $event.itemsPerPage;
    this.search();
  }

  search() {
    const value = `${this.form.value.search} in:login ${this.form.value.search} in:name`;
    
    const url: string = `?q=${value}&per_page=${this.perPage}&page=${this.page}`;

    this.searchService.searchUsers(url)
    .pipe((tap((res) => {
      
      this.users.next(res.items)
      this.totalCount = res.total_count;
      return res
    })))
    .subscribe(v => {});
  }

}
