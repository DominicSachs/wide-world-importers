import { HttpClient } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { CustomerEditResponse, CustomerListReponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';

describe('CustomerService', () => {
  let httpClient: HttpClient;
  let sut: CustomerService;

  beforeEach(() => {
    httpClient = {
      get: () => of({}),
      put: () => of({})
    } as unknown as HttpClient;

    sut = new CustomerService(httpClient);
  });

  it('gets a list of customers and sets the correct query string', fakeAsync(() => {
    const pagedResult = {
      items: [
        { id: 1, name: 'Customer 1' },
        { id: 2, name: 'Customer 2' }
      ],
      count: 2
    } as PagedResponse<CustomerListReponse>;

    const filter = new DataFilter();
    filter.sortColumn = 'name';
    vi.spyOn(httpClient, 'get').mockReturnValue(of(pagedResult));

    let result = {} as PagedResponse<CustomerListReponse>;
    sut.getCustomers(filter).subscribe(c => result = c);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/customers?page=0&pageSize=10&sortColumn=name&sortDirection=0`);
    expect(result.count).toBe(2);
  }));

  it('gets a customers and sets the correct paramter', fakeAsync(() => {
    const mockResult = { id: 1, name: 'Customer 1' };
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResult));

    let result = {};
    sut.getCustomer(1).subscribe(c => result = c);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/customers/1`);
    expect(result).toEqual(mockResult);
  }));

  it('updates a customer', fakeAsync(() => {
    vi.spyOn(httpClient, 'put').mockReturnValue(of(void 0));
    const customerToUpdate = { id: 1, name: 'Customer 1' } as CustomerEditResponse;

    sut.update(customerToUpdate).subscribe();

    expect(httpClient.put).toHaveBeenCalledWith(`${environment.apiUrl}/customers/1`, customerToUpdate);
  }));
});
