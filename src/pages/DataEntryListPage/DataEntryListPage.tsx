import { FC } from 'react';

import { useDataEntries } from '@/features/dataEntries';
import DataEntryView from '@/features/DataEntryView';
import { Link } from 'react-router-dom';

const DataEntryListPage: FC = (): JSX.Element => {
  const { data: dataEntries, isLoading, isError, error } = useDataEntries();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Unable to get data entries'}</div>;
  }

  if (!dataEntries) {
    return <div>No data entries available!</div>;
  }

  return (
    <ul>
      {dataEntries.map((dataEntry) => (
        <li key={dataEntry.id}>
          <Link to={`/data-entry/${dataEntry.id}`}>
            <DataEntryView dataEntry={dataEntry} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DataEntryListPage;
