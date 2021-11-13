import { useState } from 'react';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';
import { CreditCardTypes, Currencies } from './consts';
import { Button } from 'antd';
import { Container, Form } from './Styles';

const { Option } = Select;

const usersMock = [{ name: 'Bob' }, { name: 'Alice' }, { name: 'Sara' }];

const TransactionCreate = () => {
  const [formData, setFormData] = useState({
    currency: '',
    totalPrice: 0,
    creditCardType: '',
    creditCardNumber: '',
    user: 'test',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropDown = (value: string, type: string) => {
    setFormData({ ...formData, [type]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const renderDropDowns = () => (
    <>
      <Select
        defaultValue="User"
        style={{ width: '100%' }}
        onChange={(newValue) => handleDropDown(newValue, 'user')}
      >
        {usersMock.map((user, i) => (
          <Option key={i} value={user.name}>
            {user.name}
          </Option>
        ))}
      </Select>
      <Select
        defaultValue="Currency"
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
        defaultValue="Credit Card Type"
        style={{ width: '100%' }}
        onChange={(newValue) => handleDropDown(newValue, 'creaditCardType')}
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
        <Input type="text" placeholder="enter a price" onChange={handleInputChange} name="totalPrice" />
        <Input
          type="text"
          placeholder="enter credit card number"
          onChange={handleInputChange}
          name="creditCardNumber"
        />
        <Button type="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default TransactionCreate;
