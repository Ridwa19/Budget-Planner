import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetList = () => {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/budgets', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                });
                setBudgets(response.data);
            } catch (error) {
                console.error(error.response.data);
                // Handle fetch error
            }
        };

        fetchBudgets();
    }, []);

    return (
        <div>
            <h2>Budgets</h2>
            <ul>
                {budgets.map(budget => (
                    <li key={budget._id}>
                        {budget.name} - ${budget.totalAmount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BudgetList;
