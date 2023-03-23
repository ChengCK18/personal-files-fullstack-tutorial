import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR_BIRTHYEAR } from "../queries";

const AuthorBirthYear = () => {
    const [name, setName] = useState("");
    const [setBornTo, setSetBornTo] = useState("");

    const [changeAuthorBirthyear, result] = useMutation(EDIT_AUTHOR_BIRTHYEAR);

    const submit = (event) => {
        event.preventDefault();
        changeAuthorBirthyear({ variables: { name, setBornTo } });
        setName("");
        setSetBornTo("");
    };

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            console.log("Author not found");
        } else {
            console.log(result);
        }
    }, [result.data]);

    console.log("rerenbdering");
    return (
        <form onSubmit={submit}>
            <h2>Set Birthyear</h2>
            <div>
                Name
                <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                Born
                <input
                    type="number"
                    value={setBornTo}
                    onChange={({ target }) =>
                        setSetBornTo(parseInt(target.value))
                    }
                />
            </div>
            <button type="submit">Update Author</button>
        </form>
    );
};

export default AuthorBirthYear;
