import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';

export const MAT_CARD_EDIT = [MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle];
export const MAT_TABLE = [
  MatCell,
  MatCellDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatColumnDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatPaginator,
  MatRow,
  MatRowDef,
  MatSort,
  MatSortHeader,
  MatTable
];
