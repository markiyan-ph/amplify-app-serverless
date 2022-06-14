import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


const serverAPI = "testserverlessapi";

function App() {
  const [people, updatePeople] = useState([]);
  const [idInput, setIdInput] = useState("");
  const [starshipData, setStarshipData] = useState(null);

  async function getPeopleData() {
    try {
      const peopleData = await API.get(serverAPI, `/people/${idInput}`);
      console.log("peopleData", peopleData);
      updatePeople(peopleData.people);
    } catch (err) {
      console.log({ err });
    }
  }
  
  async function getStarshipData() {
    try {
      const starshipData = await API.get(serverAPI, `/starshiptest/${idInput}`);
      console.log("starship", starshipData);
      setStarshipData(starshipData.starship);
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    getPeopleData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello world!</h1>
        <input placeholder="User Id" type="text" value={idInput} onChange={(e) => {setIdInput(e.target.value)}} />
        <button onClick={() => {setStarshipData(null); getPeopleData(idInput)}}>Get user data</button>
        <button onClick={() => {getStarshipData(idInput)}}>Get user starship data</button>
        {
          people.map((p) => ( <h3 key={p.url.split('/').at(-2)}> {p.name}</h3> ))
        }
        <p>{starshipData ? JSON.stringify(starshipData) : null}</p>
      </header>
    </div>
  );
}

// export default App;
export default withAuthenticator(App);
