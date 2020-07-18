
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';

// Simple query
const allTodos = API.graphql(graphqlOperation(queries.listTodos));
console.log(allTodos);