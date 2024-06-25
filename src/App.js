import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        {/* This is where the rest of your components will be rendered */}
      </div>
    </Router>
  );
};

export default App;
