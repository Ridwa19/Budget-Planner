import React, { useState } from 'react';
import axios from 'axios';

const AddBudgetForm = () => {
    const [name, setName] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/budgets', {
                name,
                totalAmount,
                description
            }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            console.log(response.data);
            // Handle successful budget creation, e.g., refresh budget list
        } catch (error) {
            console.error(error.response.data);
            // Handle budget creation error
        }
    };

    return (
        <div>
            <h2>Add Budget</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Budget Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Total Amount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Budget</button>
            </form>
        </div>
    );
};

export default AddBudgetForm;
