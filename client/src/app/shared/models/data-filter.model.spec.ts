import { DataFilter } from '@app/shared/models/data-filter.model';

describe('DateFilter', () => {
  it('resets the filter', () => {
    const testObject = new DataFilter();
    testObject.page = 2;
    testObject.pageSize = 25;
    testObject.sortColumn = 'test';

    testObject.reset();

    expect(testObject.page).toBe(0);
    expect(testObject.pageSize).toBe(10);
    expect(testObject.sortColumn).toBe('');
  });
});
