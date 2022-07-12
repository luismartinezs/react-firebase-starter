import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useCreateDataEntry } from '@/features/dataEntries';

const NewDataEntryPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { mutate: createDataEntry } = useCreateDataEntry();

  const handleCreateDataEntry = () => {
    createDataEntry();
    navigate('/data-entry');
  };
  return (
    <>
      <h1>New data entry page</h1>
      <button onClick={handleCreateDataEntry}>Create new data entry</button>
    </>
  );
};

export default NewDataEntryPage;
