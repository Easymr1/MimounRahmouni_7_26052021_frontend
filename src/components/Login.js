import React from 'react';
import axios from 'axios';


export default class PersonList extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange = event => {
      this.setState({ password: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();

    const login = {
      email: this.state.email,
      password: this.state.password
    };


    axios.post(`http://localhost:3001/api/employes/login`,  login )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="text" name="password" onChange={this.handlePasswordChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
   