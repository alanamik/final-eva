import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Search from './components/search';
import AboutUser from './components/aboutuser';
import NoUser from './components/nouser';
import { useState } from 'react';


function App() {

  const [searchedUser, setSearchedUser] = useState("test");
  const [userName, setUserName] = useState("");
  const [checkSearchedUser, setCheckSearchedUser] = useState(0);
  const [checkSubs, setCheckSubs] = useState(0);


  return (

    <div className="App">
      <Search checkSubs = {checkSubs} setCheckSubs= {setCheckSubs}  searchedUser={searchedUser} setSearchedUser={setSearchedUser} userName={userName} setUserName={setUserName} checkSearchedUser ={checkSearchedUser} setCheckSearchedUser = {setCheckSearchedUser} />
      {(checkSearchedUser === 1 && (<AboutUser checkSubs = {checkSubs} setCheckSubs= {setCheckSubs} setSearchedUser={setSearchedUser} searchedUser={searchedUser} />))}
      {(checkSearchedUser === -1 && (<NoUser userName={userName} />))}
    </div>
  );
}

export default App;
