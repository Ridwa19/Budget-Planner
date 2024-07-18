Budget Planner
Budget Planner Web App using React

Overview
This web application serves as a budget planner, allowing users to manage their finances effectively. It provides functionalities for adding budgets, managing budgets, adding transactions, and managing transactions.

Features
Authentication

Login: Secure login functionality for registered users.
Register: New users can create accounts to access the app.
Sign Out: Allows users to securely log out of their accounts.
Dashboard

Transaction Summary: Provides an overview of transactions, categorized by type (expense or income).
Budget Summary: Displays a summary of budgets, showing allocated amounts and expenditures.
Menu Navigation

Left-Side Menu: Accessible navigation menu offering seamless access to major functionalities.
Manage Budgets

Add Budget: Allows users to add new budget categories with allocated amounts.
Update and Delete: Enables users to modify existing budgets or remove them as needed.
Manage Transactions

Add Transaction: Facilitates the addition of transactions, specifying category, amount, date, type (expense or income), and optional description.
Update and Delete: Provides options to edit transaction details or delete transactions.
Technologies Used
Frontend: React
Styling: Tailwind CSS
State Management: Context API
Authentication: Firebase Authentication
Getting Started
To run this project locally, follow these steps:

Clone this repository.
Install dependencies using npm install.
Configure Firebase credentials for authentication.
Run the development server using npm start.
Project Structure
css
Copy code
Budget-Planner/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── dashboard
│   │   │___budgetmanagment  
│   │   │___ budgetfron
│   │   │___loader 
│   │   ├── Nvbar
│   │   │__navitem
│   │   │__Transaction managment
│   │   │__transactionfrom
│   │   ├___Hooks
│   │   │_usercurrent
│   │   │useform   
│   │   │   
│   │   ├── pages/
│   │   │ _home 
│   │   │_singin
│   │   │_singout  
│   │   
│   │      
│   │   
│   │       
│   ├── context
│   │   └── TransactionContext.jsx
│   ├── firebase/
│   │   ├── firebase.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   ├── README.md
│   └── ...
└── ...

Screenshots

Dashboard displaying transaction and budget summaries.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
React
Tailwind CSS
Firebase
React Icons
DatePicker