import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      })
  }

  return (
    <>
      <h2>Users Management System</h2>
      <h3>The Number of Users: {users?.length}</h3>
      <form onSubmit={handleAddUser}>
        <input name='name' type="text" id='name' />
        <br />
        <input type="email" name="email" id="email" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map(user=><p key={user.id}>{user.name}</p>)
        }
      </div>
    </>
  )
}

export default App
