import { FC } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import DataEntryView from '@/features/DataEntryView';
import { useDataEntry, useDeleteDataEntry, useEditDataEntry } from '@/features/dataEntries';
import { serverTimestamp, type Timestamp } from 'firebase/firestore';

const DataEntryDetailPage: FC = (): JSX.Element => {
  let { entryUid } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteDataEntry } = useDeleteDataEntry();
  const { mutate: editDataEntry } = useEditDataEntry();

  if (typeof entryUid === 'undefined') {
    navigate('/404');
    return <></>;
  }

  const { data: dataEntry, isLoading, isError, error } = useDataEntry(entryUid);

  if (isLoading) {
    return (
      <>
        <h1>Data entry detail page</h1>
        <div>Loading...</div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1>Data entry detail page</h1>
        <div>Error: {error instanceof Error ? error.message : 'Unable to get entry'}</div>
      </>
    );
  }

  if (!dataEntry) {
    return (
      <>
        <h1>Data entry detail page</h1>
        <div>Entry not available!</div>
      </>
    );
  }

  const handleDeleteDataEntry = async () => {
    if (typeof entryUid === 'undefined') {
      return;
    }
    await deleteDataEntry(entryUid);
    navigate('/data-entry');
  };

  const handleEditDataEntry = async () => {
    if (typeof entryUid === 'undefined') {
      return;
    }
    await editDataEntry({
      id: entryUid,
      newDataEntry: {
        timestamp: serverTimestamp() as Timestamp,
      },
    });
    navigate('/data-entry');
  };

  return (
    <>
      <h1>Data entry detail page</h1>
      <DataEntryView dataEntry={dataEntry} />
      <button onClick={handleDeleteDataEntry}>Delete entry</button>
      <button onClick={handleEditDataEntry}>Update entry timestamp</button>
    </>
  );
};

export default DataEntryDetailPage;
