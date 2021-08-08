import React, { Component, useEffect, useState } from "react";

const Search = () => {
  const token = sessionStorage.getItem("token");
  const [query, setQuery] = useState();
  const [patients, setPatients] = useState([]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setTimeout(() => {
      fetch(`http://localhost:4000/search?key=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((patients) => {
          setPatients(patients)
        });
    }, 200);
  };

  return (
    <div>
      <input type="text" name="search" onChange={handleSearch} />
      <button>Search</button>
      {query && <p>Results for: {query}</p>}

      <div style={{ marginTop: 10 }}>
        {patients &&
          patients.map((patients) => (
            <div key={patients.PatientID}>
              <ul>
                <li>{patients.First_Name}</li>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

// class Search extends Component {
//   state = {
//     query: '',
//     users: []
//   }

//   handleSearch = event => {
//     const query = event.target.value

//   setTimeout(() => {
//     fetch(`https://api.github.com/search/users?q=${query}`)
//       .then(response => response.json())
//       .then(users => {
//         this.setState({
//           query,
//           users: users.items
//         })
//       })
//   }, 200)
// }

//   render() {
//     const { query, users } = this.state

//     return (
//   <div>
//     <input type="text" name="search" onChange={this.handleSearch} />
//     <button>Search</button>
//     {query && <p>Results for: {query}</p>}

//     <div style={{ marginTop: 10 }}>
//       {users &&
//         users.map(user => (
//           <div key={user.id}>
//             <ul>
//               <li>{user.login}</li>
//               <li>
//                 <a href={user.url}>{user.url}</a>
//               </li>
//               <li>
//                 <img alt="Avatar" src={user.avatar_url} width={50} />
//               </li>
//             </ul>
//           </div>
//         ))}
//     </div>
//   </div>
// )
//   }
// }

export default Search;
