import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPokeDetails } from './display-poke-details';

describe('DisplayPokeDetails', () => {
  let component: DisplayPokeDetails;
  let fixture: ComponentFixture<DisplayPokeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayPokeDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPokeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
