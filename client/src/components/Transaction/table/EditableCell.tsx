import { useEffect, useState } from 'react';

export const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}: {
  value: any;
  row: any;
  column: any;
  updateMyData: (rowIndex: number, columnId: number, value: string | number) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};
