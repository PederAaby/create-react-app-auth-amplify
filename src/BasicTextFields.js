import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {withAuthenticator} from "aws-amplify-react";
import {API,Auth, graphqlOperation} from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

//Pass Auth.currentUserinfo.name here
class BasicTextFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        //Handlesubmit -> Insert innhold i inputform med cognitoconxt.cognitoId som key
        event.preventDefault();
        Auth.currentUserInfo()
            .then(r => this.graphQlSubmit(r.attributes.sub));
    }

    graphQlSubmit(sub) {
        const todo = {id: sub, name: this.state.value, description: 'Hello world!'};
        alert(JSON.stringify(todo))
        API.graphql(graphqlOperation(mutations.updateTodo, {input: todo})).then(r => alert(JSON.stringify(r)));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField value={this.state.value} onChange={this.handleChange} id="standard-basic" label="Standard" />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


export default BasicTextFields;
