import React from 'react'
import EditAuthor from "./EditAuthor";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const authorsObj = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null;
  }

  if (authorsObj.loading) {
    return <p>loading...</p>;
  }

  const authors = authorsObj.data.allAuthors;

  return (
    <div>
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
      </div>
      <div>
        <EditAuthor authors={authors}/>
      </div>
    </div>
  );
};

export default Authors;
