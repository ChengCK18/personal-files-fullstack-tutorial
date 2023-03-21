import { gql, useQuery } from "@apollo/client";
import Persons from "./components/Persons";
const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

// client.query({ query }).then((response) => {
//   console.log(response.data);
// });

const App = () => {
  const result = useQuery(ALL_PERSONS); //useQuery, popular approach to making queries
  if (result.loading) {
    //true until a response is provided, is there timeout?
    return <div>loading...</div>;
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

export default App;
