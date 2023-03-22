import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import PhoneForm from "./components/PhoneForm";
import { ALL_PERSONS } from "./queries";

// client.query({ query }).then((response) => {
//   console.log(response.data);
// });

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    //pollInterval constantly check with server every x seconds. Can be heavy on server in future :/. Use refetchQueries instead.
    // const result = useQuery(ALL_PERSONS, { pollInterval: 2000 }); //useQuery, popular approach to making queries
    const result = useQuery(ALL_PERSONS);
    if (result.loading) {
        //true until a response is provided, is there timeout?
        return <div>loading...</div>;
    }

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 10000);
    };

    return (
        <div>
            <Notification errorMessage={errorMessage} />
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify} />
            <PhoneForm setError={notify} />
        </div>
    );
};

export default App;
