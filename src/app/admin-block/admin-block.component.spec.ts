import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlockComponent } from './admin-block.component';

describe('AdminBlockComponent', () => {
  let component: AdminBlockComponent;
  let fixture: ComponentFixture<AdminBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
