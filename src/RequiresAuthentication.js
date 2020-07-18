import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, {API, Auth, graphqlOperation} from 'aws-amplify';
import aws_exports from './aws-exports';
import SimpleTabs from "./demotabs";
import * as queries from "./graphql/queries";
import BasicTextFields from "./BasicTextFields";
Amplify.configure(aws_exports);



class MyAuthenticatedPage extends Component {
    listCognitoName = async () => {
        console.log('listing name');
        const name = await Auth.currentUserInfo();
        alert(JSON.stringify(name.attributes.sub));
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>awesome</p>
                    <p> Click a button </p>
                    <button onClick={this.listCognitoName}>Listcognitoname</button>
                </header>

                <BasicTextFields/>
            </div>
        );
    }
}

export default withAuthenticator(MyAuthenticatedPage, true);
