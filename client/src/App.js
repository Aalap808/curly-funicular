
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function App() {

  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList,setPasswordList] = useState([]);


  useEffect(()=>{
    Axios.get("http://localhost:3001/showpasswords").then((response)=>{
    setPasswordList(response.data);
    });

  },[]);
  
  

  const addPassword = ()=>{
    Axios.post("http://localhost:3001/addpassword",
      {password: password,title: title});
  };

  const decryptPassword = (encryption)=>{
      Axios.post("http://localhost:3001/decryptpassword",{
        password: encryption.password,
        iv: encryption.iv
      }).then((response)=>{
        setPasswordList(passwordList.map((val)=>{
          return val.id === encryption.id 
          ? {id: val.id,
            password:val.password,
            title:response.data,
            iv:val.iv}
            : val;
        }))
      })
  };



  return (
    <div className="App">
      <h1 className="Heading">PasswordLists</h1>
     <div className="AddingPasswords">
      <input type = "text" placeholder='Ex.1234'
      onChange={(event)=>{setPassword(event.target.value);}}/>
      <input type = "text" placeholder='Ex.Facebook'
      onChange={(event)=>{setTitle(event.target.value);}}/>
      <button onClick={addPassword}>Add Password</button>
     </div>

     <div className="Passwords">
      {passwordList.map((val,key)=>{
        return( <div className="password" onClick={()=>{decryptPassword({password:val.password,iv: val.iv,id: val.id})}}
        key={key}
        >
          <h2>{val.title}</h2>
          </div>
        );
      })}


     </div>

    </div>
  );
}

export default App;
