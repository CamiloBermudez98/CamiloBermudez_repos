import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObjetComponent } from './create-objet.component';

describe('CreateObjetComponent', () => {
  let component: CreateObjetComponent;
  let fixture: ComponentFixture<CreateObjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateObjetComponent]
    });
    fixture = TestBed.createComponent(CreateObjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
