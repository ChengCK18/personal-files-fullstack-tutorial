import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../queries";
import AuthorBirthYear from "./AuthorBirthYear";

const Authors = (props) => {
    const result = useQuery(GET_ALL_AUTHORS);

    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>Getting list of authors...</div>;
    }
    let authors = result.data.allAuthors;

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AuthorBirthYear />
        </div>
    );
};

export default Authors;
