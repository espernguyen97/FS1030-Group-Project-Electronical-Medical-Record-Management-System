import React, { Component } from 'react'
import { Col,Button } from 'reactstrap';

class Search extends Component {
  state = {
    query: '',
    users: []
  }

  handleSearch = event => {
    const query = event.target.value

    setTimeout(() => {
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json())
        .then(users => {
          this.setState({
            query,
            users: users.items
          })
        })
    }, 200)
  }

  render() {
    const { query, users } = this.state

    return (
      <div>
        <input type="text" name="search" onChange={this.handleSearch} />
        <Button color="warning">Search</Button>
        {query && <p>Results for: {query}</p>}

        <div style={{ marginTop: 10 }}>
          {users &&
            users.map(user => (
              <div key={user.id}>
                <ul>
                  <li>{user.login}</li>
                  <li>
                    <a href={user.url}>{user.url}</a>
                  </li>
                  <li>
                    <img alt="Avatar" src={user.avatar_url} width={50} />
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default Search
