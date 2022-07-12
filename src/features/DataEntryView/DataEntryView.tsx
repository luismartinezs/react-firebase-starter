import { FC } from 'react';

import { IDataEntryViewProps } from './DataEntryView.props';

const DataEntryView: FC<IDataEntryViewProps> = ({ dataEntry }): JSX.Element => {
  return (
    <div>
      <span>Data entry:&nbsp;</span>
      <span>Id: {dataEntry.id}&nbsp;</span>
      <span>Timestamp: {dataEntry.timestamp && +dataEntry.timestamp}&nbsp;</span>
      <span>User uid: {dataEntry.userUid}</span>
    </div>
  );
};

export default DataEntryView;
