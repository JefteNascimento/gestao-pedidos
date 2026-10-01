import { TestBed } from '@angular/core/testing';
import { NovoPedido } from './novo-pedido';

describe('NovoPedido', () => {
  let service: NovoPedido;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovoPedido);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
