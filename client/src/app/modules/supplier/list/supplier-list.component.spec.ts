import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SupplierListComponent } from '@app/modules/supplier/list/supplier-list.component';
import { SupplierListReponse } from '@app/modules/supplier/supplier.model';
import { SupplierService } from '@app/modules/supplier/supplier.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { firstValueFrom, of, throwError } from 'rxjs';

describe('SupplierListComponent', () => {
  let sut: SupplierListComponent;
  let fixture: ComponentFixture<SupplierListComponent>;
  let service: SupplierService;

  beforeEach(async () => {
    service = {
      getSuppliers: () => of({})
    } as unknown as SupplierService;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule]
    })
    .overrideComponent(SupplierListComponent, {
      add: {
        providers: [{ provide: SupplierService, useValue: service }]
      },
      remove: {
        providers: [SupplierService]
      }
    });

    fixture = TestBed.createComponent(SupplierListComponent);
    sut = fixture.componentInstance;
    sut.paginator = {} as unknown as MatPaginator;
    sut.sort = {} as unknown as MatSort;
  });

  it('calls getSuppliers on ngAfterViewInit', fakeAsync(async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<SupplierListReponse>;
    jest.spyOn(service, 'getSuppliers').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();
    tick(1);

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getSuppliers).toHaveBeenCalledTimes(1);
  }));

  it('calls getSuppliers on ngAfterViewInit and returns empty result on error', fakeAsync(async () => {
    const mockResult = { count: 0, items: [] } as PagedResponse<SupplierListReponse>;
    jest.spyOn(service, 'getSuppliers').mockReturnValue(throwError(() => {}));

    sut.ngAfterViewInit();
    tick(1);

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getSuppliers).toHaveBeenCalledTimes(1);
  }));
});
