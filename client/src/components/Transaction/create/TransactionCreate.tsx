import { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';
import { CreditCardTypes, Currencies, formDataInitialState } from './consts';
import { Button } from 'antd';
import { Container, Form } from './Styles';
import { TransactionsContext } from '../../../context/Context';

const { Option } = Select;

const usersMock = [
  { id: 1, first_name: 'Bob', last_name: 'Cohen' },
  { id: 2, first_name: 'Alice', last_name: 'Levi' },
  { id: 3, first_name: 'Sara', last_name: 'Gur' },
];

const TransactionCreate = () => {
  const [formData, setFormData] = useState(formDataInitialState);

  const { addTrs, transactions } = useContext(TransactionsContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropDown = (value: string, type: string) => {
    setFormData({ ...formData, [type]: value });
  };

  const handleUserDropDown = (newValue: string) => {
    const currentUser = usersMock.find((user) => user.id === +newValue);
    setFormData({ ...formData, first_name: currentUser!.first_name, last_name: currentUser!.last_name });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // addTrs({ ...transactions[0], ...formData, transaction_id: JSON.stringify(transactions.length + 1) });
    setFormData(formDataInitialState);
  };

  const renderDropDowns = () => (
    <>
      <Select
        value={formData['first_name']}
        style={{ width: '100%' }}
        onChange={(newValue) => handleUserDropDown(newValue)}
      >
        {usersMock.map((user, i) => (
          <Option key={i} value={user.id}>
            {`${user.first_name} ${user.last_name}`}
          </Option>
        ))}
      </Select>
      <Select
        value={formData['currency']}
        style={{ width: '100%' }}
        onChange={(newValue) => handleDropDown(newValue, 'currency')}
      >
        {Currencies.map((currency, i) => (
          <Option key={i} value={currency}>
            {currency}
          </Option>
        ))}
      </Select>
      <Select
        value={formData['credit_card_type']}
        style={{ width: '100%' }}
        onChange={(newValue) => handleDropDown(newValue, 'credit_card_type')}
      >
        {CreditCardTypes.map((type, i) => (
          <Option key={i} value={type}>
            {type}
          </Option>
        ))}
      </Select>
    </>
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {renderDropDowns()}
        <Input
          type="text"
          placeholder="enter a price"
          onChange={handleInputChange}
          name="total_price"
          value={formData['total_price']}
        />
        <Input
          type="text"
          placeholder="enter credit card number"
          onChange={handleInputChange}
          name="credit_card_number"
          value={formData['credit_card_number']}
        />
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default TransactionCreate;
