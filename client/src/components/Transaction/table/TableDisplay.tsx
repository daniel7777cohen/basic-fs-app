import { useContext, useEffect } from 'react';
import { useTable, usePagination, Column, useSortBy } from 'react-table';
import { TransactionTableData } from '../../../common/types';
import { TransactionsContext } from '../../../context/Context';
import { EditableCell } from './EditableCell';

const defaultColumn = {
  Cell: EditableCell,
};

export const TableDisplay = ({
  columns,
  data,
  onTableFieldChange,

  getRowProps,
}: {
  columns: Column[];
  data: TransactionTableData[];
  onCheckboxClick: any;
  onTableFieldChange: (rowIndex: number, field_name: string, value: string | number | boolean) => void;
  getRowProps: any;
}) => {
  const { currentTablePage, setCurrentTablePage } = useContext(TransactionsContext);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: false,
      autoResetFilters: false,
      autoResetSortBy: false,
      initialState: {
        sortBy: [
          {
            id: 'is_deleted',
            desc: false,
          },
        ],
        pageIndex: currentTablePage,
      },
      onTableFieldChange,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setCurrentTablePage(pageIndex);
  }, [pageIndex, setCurrentTablePage]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination" style={{marginTop:'auto'}}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
