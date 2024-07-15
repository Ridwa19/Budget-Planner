import { useState } from 'react';

const useFormState = () => {
  const [transaction, setTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date(),
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setTransaction({
      ...transaction,
      date,
    });
  };

  const resetTransaction = () => {
    setTransaction({
      type: 'expense',
      amount: '',
      category: '',
      date: new Date(),
      description: '',
    });
  };

  return {
    transaction,
    handleChange,
    handleDateChange,
    resetTransaction,
  };
};

export default useFormState;
