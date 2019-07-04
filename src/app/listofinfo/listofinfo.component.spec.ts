import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofinfoComponent } from './listofinfo.component';

describe('ListofinfoComponent', () => {
  let component: ListofinfoComponent;
  let fixture: ComponentFixture<ListofinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
