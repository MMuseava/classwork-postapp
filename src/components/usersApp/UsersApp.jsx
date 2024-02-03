import React, { useState } from 'react'
import "./usersApp.style.css"

const initialValue = {
    userName: "",
    userSurname: "",
    userSalary: "", 
}
const UsersApp = () => {

    const [userData, setUserData] = useState(initialValue);
    const [users, setUsers] = useState([]);
    const [editableUserData, setEditableUserData] = useState({
        isEdit: false,
        userIndex: null
    });


    const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;

    const handleRemoveClick = (index) => {
        setUsers(users.filter((user, userIndex) => userIndex !== index))
    };

    const handleEditClick = (data, index) => {
        setUserData(data)
        setEditableUserData({
            isEdit: true,
            userIndex: index
        });
    }
    const handleSubmitUser = (e) => {
        e.preventDefault()

        if (isFilledFields) {
            if (editableUserData.isEdit) {
                const editedData = users;

                editedData.splice(editableUserData.userIndex, 1, userData);

                setUsers(editedData);

                setEditableUserData({
                    isEdit: false,
                    userIndex: null
                })

            } else {
                
                setUsers((prevState) => [...prevState, userData])
            }
            setUserData(initialValue)
        }
    };

    const handleCleanClick = () => {
        setUserData(initialValue)
    };

    console.log("users", users);

  return (
      <div className='wrapper'>
          <div className='wrapper-content'> 
              <div className='table-data'>
                  <table>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>user name</th>
                              <th>user surname</th>
                              <th>user salary</th>
                              <th>action</th>
                          </tr>
                      </thead>

                          <tbody>
                          {users.map((user, index) => (
                              <tr>
                                  <td>{index + 1} </td>
                                  <td> {user.userName} </td>
                                  <td> {user.userSurname} </td>
                                  <td> {user.userSalary} </td>
                                  <td>
                                      <div>
                                          <button
                                              onClick={()=>handleEditClick(user, index)}
                                              className='edit-action'> edit</button>
                                          <button
                                              onClick={()=>handleRemoveClick(index)}
                                              className='remove-action'>remove</button>
                                      </div>
                                  </td>
                                  
                              </tr>
                          ))}
                          </tbody>
                  </table>
              </div>
              <div className='form-data'>
              <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
                  <input
                      placeholder='write your name'
                          onChange={(e) => setUserData((prevState) => ({ ...prevState, userName: e.target.value }))}
                          value={userData.userName}
                  />
                  <input
                      placeholder='write your surname'
                          onChange={(e) => setUserData((prevState) => ({ ...prevState, userSurname: e.target.value }))}
                          value={userData.userSurname}
                  />
                  <input
                      placeholder='write your salary'
                          onChange={(e) => setUserData((prevState) => ({ ...prevState, userSalary: e.target.value }))}
                          value={userData.userSalary}
                  />
                  
                  <div className='buttons-wrapper'>
                      <button  type='reset'>clean</button>
                      <button disabled={!isFilledFields} type='submit'> {editableUserData.isEdit ? "Edit" : "Add"} </button>
                    
                  </div>
                  </form>
                  </div>
          </div>
    </div>
  )
}

export default UsersApp