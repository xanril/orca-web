import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieItemComponent } from './search-movie-item.component';

describe('SearchMovieItemComponent', () => {
  let component: SearchMovieItemComponent;
  let fixture: ComponentFixture<SearchMovieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMovieItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMovieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
