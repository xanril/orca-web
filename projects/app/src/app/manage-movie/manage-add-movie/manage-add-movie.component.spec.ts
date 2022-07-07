import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddMovieComponent } from './manage-add-movie.component';

describe('ManageAddMovieComponent', () => {
  let component: ManageAddMovieComponent;
  let fixture: ComponentFixture<ManageAddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAddMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
