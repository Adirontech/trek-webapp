import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from 'react-table';
import '../assets/stylesheets/App.css';
import Navbar from '../components/Navbar';

const LandAllocation = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/trips/basic')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const columns = React.useMemo(() => {
        if (data.length > 0) {
            return Object.keys(data[0]).map(key => {
                return {
                    Header: key,
                    accessor: key
                };
            });
        } else {
            return [];
        }
    }, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
    } = useTable({ columns, data }, useSortBy, usePagination);

    const { pageIndex, pageSize } = state;

    return (
        <div className="min-h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
            <Navbar />
            <div className="bg-white p-6 rounded-lg shadow-md w-5/6 mx-auto mt-5">
                <table {...getTableProps()} className="table-auto w-full">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2">
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' ↑'
                                                    : ' ↓'
                                                : ''}
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
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="border px-4 py-2">{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
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
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default LandAllocation;