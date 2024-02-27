import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Users() {
  const [users,setUsers]=useState([])

  useEffect(()=> {
 axios.get('http://localhost:5000/account')
 .then(res=>setUsers(res.data))
 .catch(err =>console.log(err))
  },[])
  return (
    <div className='vh-100 bg-black  d-flex justify-content-center align-items-center '>
      <div style={{height:"500px"}} className="w-50 bg-white p-3 overflow-x-auto overflow-y-auto ">
        <h2>Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
           {users.map((user,index)=>(
         <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
         </tr>
           ))}
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default Users