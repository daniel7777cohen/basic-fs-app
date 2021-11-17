import { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';
import { CreditCardTypes, Currencies, formDataInitialState } from './consts';
import { Button } from 'antd';
import { Container, Form } from './Styles';
import { TransactionsContext } from '../../../context/Context';
import { customersMock } from './customers-mock';

const { Option } = Select;

const usersMock = customersMock.filter(({ is_deleted }) => !is_deleted);

const TransactionCreate = () => {
  const [formData, setFormData] = useState(formDataInitialState);

  const { addTrs, isUpdating } = useContext(TransactionsContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropDown = (value: string, type: string) => {
    setFormData({ ...formData, [type]: value });
  };

  const handleUserDropDown = (newValue: string) => {
    const currentUser = usersMock.find((user) => user._id === newValue);

    if (currentUser) {
      setFormData({
        ...formData,
        customer_id: currentUser._id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
      });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //validateForm(); make sure fields are valid and not empty
    await addTrs(formData);
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
          <Option key={i} value={user._id}>
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
        <Input type="text" placeholder="enter a price" onChange={handleInputChange} name="total_price" />
        <Input
          type="text"
          placeholder="enter credit card number"
          onChange={handleInputChange}
          name="credit_card_number"
        />
        <Button type="primary" onClick={handleSubmit} disabled={isUpdating}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default TransactionCreate;
