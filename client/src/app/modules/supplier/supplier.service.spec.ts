import { HttpClient } from '@angular/common/http';
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

  it('gets a list of suppliers and sets the correct query string', done => {
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

    sut.getSuppliers(filter).subscribe(result => {
      expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/suppliers?${filter.toQueryString()}`);
      expect(result.count).toBe(2);
      done();
    });
  });
});
