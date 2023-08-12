import React, { useState } from "react";
import axios from "axios";

const Greetings = () => {
  const [greetings, setGreetings] = useState([]);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const fetchGreetings = () => {
    axios
      .get("./data/greetings.json")
      .then(({ data }) => {
        setGreetings(data);
        setLoad(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const buttonText = load ? "Ok" : "Load Greetings";

  return (
    <div>
      <button onClick={() => fetchGreetings()}>{buttonText}</button>
      {greetings && (
        <>
          <h2>Greetings</h2>
          <ul>
            {greetings.map(({ text }) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Greetings;
