import { HttpClient } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { SupplierListReponse } from '@app/modules/supplier/supplier.model';
import { SupplierService } from '@app/modules/supplier/supplier.service';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { of } from 'rxjs';

describe('SupplierService', () => {
  let httpClient: HttpClient;
  let sut: SupplierService;

  beforeEach(() => {
    httpClient = {
      get: () => of({})
    } as unknown as HttpClient;

    sut = new SupplierService(httpClient);
  });

  it('gets a list of suppliers and sets the correct query string', fakeAsync(() => {
    const pagedResult = {
      items: [
        { id: 1, name: 'Supplier 1' },
        { id: 2, name: 'Supplier 2' }
      ],
      count: 2
    } as PagedResponse<SupplierListReponse>;

    const filter = new DataFilter();
    filter.sortColumn = 'name';

    spyOn(httpClient, 'get').and.returnValue(of(pagedResult));

    let result = {} as PagedResponse<SupplierListReponse>;
    sut.getSuppliers(filter).subscribe(s => result = s);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/suppliers?page=0&pageSize=10&sortColumn=name&sortDirection=0`);
    expect(result.count).toBe(2);
  }));
});
