import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

interface user {
  login : string;
  avatar_url: string;
}

function App() {
  const [oldItems , setOldItems] = useState<number>(0);
  const [newItems, setNewItems] = useState<number>(12);
  const [users, setUsers] = useState<user[]>([]);

  const infiniteScroll =() =>{
    const scrollHeight : number = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const scrollTop : number = Math.round(Math.max(document.documentElement.scrollTop, document.body.scrollTop));
    const clientHeight : number = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight ){
        setOldItems(newItems); 
        setNewItems(newItems+12);
    }
  }
const getUser = async ()=>{
  const data = await callBackAPI();
  if(users.length === 0){
    setUsers(data);
    return;
  } 
  setUsers(users.concat(data));
}


  useEffect(() => {
    window.addEventListener('scroll',infiniteScroll,true);
    getUser();
  },[newItems]);
  

  


  const  callBackAPI =  () =>{
    const gitApi: string = 'https://api.github.com/users';
    
     return  Axios.get(gitApi).then((res)=>{
      const newUser = res.data.slice(oldItems,newItems);   

       if(newUser.length !== 12 ){
            window.removeEventListener('scroll',infiniteScroll,true);
            return newUser;
      }else{
        return newUser;
      }

    })
  }

  
  return (
    <div className="App"  >
        {users.map((item: user, index: number)=>{return( 
          <div key={index} className="mainPage">
            <img src={item.avatar_url} className="mainImage" />
            <div className="mainform">
              {item.login}
            </div>
          </div>
        )
        })}
      
    </div>
  );
}



export default App;
