import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = ({ budgetId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/transactions/${budgetId}`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error(error.response.data);
                // Handle fetch error
            }
        };

        fetchTransactions();
    }, [budgetId]);

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        ${transaction.amount} - {transaction.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
