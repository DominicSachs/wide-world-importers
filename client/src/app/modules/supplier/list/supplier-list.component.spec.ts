import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of, throwError } from 'rxjs';
import { SupplierListComponent } from '@app/modules/supplier/list/supplier-list.component';
import { SupplierListReponse } from '@app/modules/supplier/supplier.model';
import { SupplierService } from '@app/modules/supplier/supplier.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';

describe('SupplierListComponent', () => {
  let sut: SupplierListComponent;
  let fixture: ComponentFixture<SupplierListComponent>;
  let service: SupplierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(SupplierService)]
    });

    service = TestBed.inject(SupplierService);
    fixture = TestBed.createComponent(SupplierListComponent);
    sut = fixture.componentInstance;
    vi.spyOn(sut, 'paginator').mockReturnValue({ page: new EventEmitter<PageEvent>() } as MatPaginator);
    vi.spyOn(sut, 'sort').mockReturnValue({ sortChange: new EventEmitter<Sort>() } as MatSort);
  });

  it('calls getSuppliers on ngAfterViewInit', async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<SupplierListReponse>;
    vi.spyOn(service, 'getSuppliers').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getSuppliers).toHaveBeenCalledTimes(1);
  });

  it('calls getSuppliers on ngAfterViewInit and returns empty result on error', async () => {
    const mockResult = { count: 0, items: [] } as PagedResponse<SupplierListReponse>;
    vi.spyOn(service, 'getSuppliers').mockReturnValue(throwError(() => new Error()));

    sut.ngAfterViewInit();

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getSuppliers).toHaveBeenCalledTimes(1);
  });
});
