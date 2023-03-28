// import React from "react";
// import ReactDOM from "react-dom/client";

// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import ReactDOM from "react-dom/client";
import App from "./App";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("phonenumbers-user-token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

// const client = new ApolloClient({
//     uri: "http://localhost:4000",
//     cache: new InMemoryCache(),
// });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

//wrapping App in ApolloProvider gives every component access to
// client object that is required to comm with graphql server
// The wrapping shares kinda the same logic as react context
// in a sense that all sub components of App will have access
// to client variable just like context sharing specific state
ReactDOM.createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
