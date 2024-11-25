import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivaForComponent } from './directiva-for.component';

describe('DirectivaForComponent', () => {
  let component: DirectivaForComponent;
  let fixture: ComponentFixture<DirectivaForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivaForComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectivaForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
