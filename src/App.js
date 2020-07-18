import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import SimpleTabs from "./demotabs";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';


Amplify.configure(aws_exports);

class App extends Component {
    todoMutation = async () => {
        const todoDetails = {
            name: 'Test123',
            description: 'Amplify CLI rocks!'
        };
        //Det er sikkert på linja under jeg egentlig kan bruke pregenererte queries.
        const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
        alert(JSON.stringify(newTodo));
    };

    listQuery = async () => {
        console.log('listing todos');
        const allTodos = await API.graphql(graphqlOperation(queries.listTodos));
        alert(JSON.stringify(allTodos));
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
           <SimpleTabs/>
        </header>
          <p> Click a button </p>
          <button onClick={this.listQuery}>GraphQL Query</button>
          <button onClick={this.todoMutation}>GraphQL Mutation</button>
      </div>
    );
  }
}

export default App;

// export default withAuthenticator(App, true);
