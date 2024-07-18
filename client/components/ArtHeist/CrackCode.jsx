import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function CrackCode() {
  const [input, setInput] = useState('');
  const [vaults, setVaults] = useState([]);
  const [selectedVault, setSelectedVault] = useState({});
//   function getOtherOwners() {
//     axios.get('/db/artOwners/')
//       .then(({ data }) => {
//         // console.log(data, 'others art');
//         data.map((art) => {
//             console.log(art.userGallery.name, 'indiv art')
//         })
//       })
//       .catch((err) => console.error('Could not GET users who currently own art', err));
//   }

  function getOtherVaults() {
    axios.get('/db/vault')
      .then(({ data }) => {
        console.log('vaults', data);
        setVaults(data);
      });
  }

  function handleSelectChange(e) {
    console.log(e.target.value);
    if (e.target.value === 'Select a vault to heist') {
      console.log('Back to default');
    } else {
      axios.get(`/db/vault/${e.target.value}`)
        .then(({ data }) => {
          setSelectedVault(data);
          console.log('YEA', data);
        })
        .catch((err) => {
          console.log(' NO', err);
        });
    }
    // setSelectedVault(e.target.value);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleGuess() {
    console.log(input, 'guessed');
  }

  useEffect(() => {
    // getOtherOwners();
    getOtherVaults();
    // console.log(vaults, 'state');
    // console.log(selectedVault, 'state');
    console.log(input, 'state');
    // console.log(passcode, 'passcode');
  }, [selectedVault, input]);

  return (
    <div>
      <h4>Crack the Code</h4>
      <Link to="/home/heist" relative="path">
        <input type="button" value="Back to the Vault" />
      </Link>
      <br />
      <select onChange={(e) => handleSelectChange(e)}>
        <option>Select a vault to heist</option>
        {vaults.map((vault) => (
          <option key={vault._id} value={vault.owner}>{vault.name}</option>
        ))}
      </select>
      {selectedVault.name
      && <h4>{`${selectedVault.name}'s Vault`}</h4>}
      <br />
      <br />
      <input type="text" placeholder="Guess vault passcode" onChange={(e) => handleInput(e)} />
      <input type="button" value="Submit Guess" onClick={() => handleGuess()} />
    </div>
  );
}

export default CrackCode;
