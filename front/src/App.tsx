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
    console.log(scrollTop + clientHeight === scrollHeight);
    
    if(scrollTop + clientHeight === scrollHeight ){
        setOldItems(oldItmes => oldItmes +12); 
        setNewItems(newItems=>newItems+12);
        console.log(newItems);
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

useEffect(()=>{
  window.addEventListener('scroll',infiniteScroll);
  console.log(1);

},[]);
  useEffect(() => {
    getUser();
    console.log(2);
    
  },[newItems]);
  

  


  const  callBackAPI =  () =>{
    const gitApi: string = 'https://api.github.com/users';
    
     return  Axios.get(gitApi).then((res)=>{

      console.log(`oldItmes : ${oldItems}` );

      console.log(`newItmes : ${newItems}` );

      const newUser = res.data.slice(oldItems,newItems);   
      if (newUser.length === 0){
        alert("마지막페이지 입니다.");
        return [];
      }
     else  if(newUser.length !== 12 ){
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
