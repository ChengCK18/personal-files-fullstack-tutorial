import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Person from "./Person";
import { FIND_PERSON } from "../queries";

const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null);
    const result = useQuery(FIND_PERSON, {
        variables: { nameToSearch },
        skip: !nameToSearch, //only execute when nameToSearch has value
    });

    if (nameToSearch && result.data) {
        //Individual view
        return (
            <Person
                person={result.data.findPerson}
                onClose={() => setNameToSearch(null)}
            />
        );
    }

    return (
        <div>
            <h2>Persons</h2>
            {persons.map((p) => (
                <div key={p.name}>
                    {p.name} {p.phone}
                    <button onClick={() => setNameToSearch(p.name)}>
                        show address
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Persons;

// const Persons = ({ persons }) => {
//   return (
//     <div>
//       <h2>Persons</h2>
//       {persons.map((p) => (
//         <div key={p.name}>
//           {p.name} {p.phone}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Persons;
