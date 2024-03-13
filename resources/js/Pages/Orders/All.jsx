import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

const Orders = ({ orders }) => {
    const data = React.useMemo(() => orders, [orders]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Order Date',
                accessor: 'order_date', // accessor is the "key" in the data
            },
            {
                Header: 'Customer Name',
                accessor: 'customer_name',
            },
            {
                Header: 'Total',
                accessor: 'total',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded-full ${value === 'Completed'
                            ? 'text-green-800 bg-green-100 dark:bg-green-200 dark:text-green-900'
                            : 'text-red-800 bg-red-100 dark:bg-red-200 dark:text-red-900'
                            }`}
                    >
                        {value}
                    </span>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data }, useSortBy, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = tableInstance;

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Orders List</h2>
            <table {...getTableProps()} className="min-w-full leading-normal">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 dark:bg-gray-700 text-left text-gray-600 dark:text-white">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-800 font-semibold text-sm">
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-white">
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()} className="px-5 py-2 border-b border-gray-200 dark:border-gray-800 text-sm">
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination dark:text-white text-center">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
            </div>
        </div>
    );
};

export default Orders;
