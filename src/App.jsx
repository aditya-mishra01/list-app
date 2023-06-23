import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css'


function App() {

  const [profiles,setprofiles] =useState([]);
  const [s_name, setName] = useState('');
  const [foundprofiles, setFoundprofiles] = useState(profiles);

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        setprofiles(response.data.data)
        setFoundprofiles(response.data.data);
        
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filters = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = profiles.filter((profile) => {
        return profile.first_name.toLowerCase().startsWith(keyword.toLowerCase());
        
      });
      setFoundprofiles(results);
    } else {
      setFoundprofiles(profiles);
      
    }

    setName(keyword);
  };
  
  const listprofile=foundprofiles.map(profile=>
    <li className='p-l' key={profile.id}>
      <div className="profile">
        <div className="p-img"><span className='p-id'>{profile.id}</span><img className="p_img" src={profile.avatar}  /></div>
        <div className="p-name">{profile.first_name}</div> 
      </div>
  
        
    </li>
  );

  return (
    <>
      
      <div className='cont-s'><input className='search' value={s_name} onChange={filters} placeholder='Search' type="search" /></div>
      <ul className='list'>{listprofile}</ul>
    </>
  )
}

export default App
