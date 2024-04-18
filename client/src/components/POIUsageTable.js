import React from 'react';
import { useTable, useSortBy } from 'react-table';

const POIUsageTable = (props) => {
  const totalColumns = React.useMemo(
    () => [
      {
        Header: 'POI_ID',
        accessor: 'poi_id',
      },
      {
        Header: 'POI_Name',
        accessor: 'poi',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Trips',
        accessor: 'trip_count',
      },
      {
        Header: 'Registered Visitors',
        accessor: 'registered_visitors',
      },
      {
        Header: 'Checked-In Visitors',
        accessor: 'checked_in_visitors',
      },
    ],
    []
  );
  const averageColumns = React.useMemo(
    () => [
      {
        Header: 'POI_ID',
        accessor: 'poi_id',
      },
      {
        Header: 'POI_Name',
        accessor: 'poi',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Average Trips',
        accessor: 'avg_trip_count',
      },
      {
        Header: 'Average Registered Visitors',
        accessor: 'avg_registered_visitors',
      },
      {
        Header: 'Average Checked-In Visitors',
        accessor: 'avg_checked_in_visitors',
      },
    ],
    []
  );
  const data = props.data;
  let columns;
  if (props.average) {
    columns = averageColumns;
  } else {
    columns = totalColumns;
  }  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()} className="xl:w-2/4 lg:w-7/12 md:w-4/5 w-full bg-white rounded-lg overflow-y-scroll">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} className=" rounded-lg">
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
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()} className="border text-center">{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default POIUsageTable;
