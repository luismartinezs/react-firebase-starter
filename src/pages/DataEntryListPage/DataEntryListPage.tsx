import { FC } from 'react';

import { useDataEntries } from '@/features/dataEntries';
import DataEntryView from '@/features/DataEntryView';
import { Link } from 'react-router-dom';

const DataEntryListPage: FC = (): JSX.Element => {
  const { data: dataEntries, isLoading, isError, error } = useDataEntries();

  if (isLoading) {
    return (
      <>
        <h1>Data entry list page</h1>
        <p>Loading...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1>Data entry list page</h1>
        <p>Error: {error instanceof Error ? error.message : 'Unable to get data entries'}</p>
      </>
    );
  }

  if (!dataEntries) {
    return (
      <>
        <h1>Data entry list page</h1>
        <p>No data entries available!</p>
      </>
    );
  }

  return (
    <>
      <h1>Data entry list page</h1>
      <ul>
        {dataEntries.map((dataEntry) => (
          <li key={dataEntry.id}>
            <Link to={`/data-entry/${dataEntry.id}`}>
              <DataEntryView dataEntry={dataEntry} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DataEntryListPage;
