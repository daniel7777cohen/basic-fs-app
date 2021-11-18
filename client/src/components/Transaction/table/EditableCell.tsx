import { Tooltip } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { TransactionsContext } from '../../../context/Context';
import { excludedTrsFields, excludedUserFields } from './consts';

export const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onTableFieldChange,
}: {
  value: any;
  row: any;
  column: any;
  onTableFieldChange: (rowIndex: number, columnId: string, value: string | number) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  const { handleNotification } = useContext(TransactionsContext);

  const onChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (value !== initialValue) {
      onTableFieldChange(index, id, value);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const isOnchangeValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (excludedUserFields.includes(id)) {
      handleNotification(`Error - Customer fields editing is forbidden at this page.`, 3500);
      return undefined;
    }

    if (excludedTrsFields.includes(id)) {
      //Todo: add a more descriptive notficitation
      handleNotification(`Error - editting the current transaction field is forbidden.`, 3500);
      return undefined;
    }
    return onChange(e);
  };
  return (
    <Tooltip placement="top" title={value}>
      <input value={value} onChange={isOnchangeValid} onBlur={onBlur} />
    </Tooltip>
  );
};
