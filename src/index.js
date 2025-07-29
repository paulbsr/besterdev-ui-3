//IMPORT REACT
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

//IMPORT RANDOM
import axios from 'axios';
import { Buffer } from 'buffer';

//IMPORT USERCONTEXT
import { useUserContext } from './UserContext';
import { UserProvider } from './UserContext';

//IMPORT FIREBASE
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/firestore';
import 'firebase/auth';

//IMPORT PAGES
import PagePeopleScorecard from './pages/PagePeopleScorecard';
import PageCyclopediaEdit from './pages/PageCyclopediaEdit';
// import PageDHKeyExchange from './pages/PageDHKeyExchange';
import PageHowtoManage from './pages/PageHowtoManage';
import PageCyclopedia from './pages/PageCyclopedia';
// import PageTaskManage from './pages/PageTaskManage';
import PageHowtoEdit from './pages/PageHowtoEdit';
import PageResources from './pages/PageResources';
// import PageTaskEdit from './pages/PageTaskEdit';
// import PageSwagger from './pages/PageSwagger';
// import PageManage from './pages/PageManage';
// import PageLogout from './pages/PageLogout';
// import PageSearch from './pages/PageSearch';
// import PageMyCV from './pages/PageMyCV';
import PageLogin from './pages/PageLogin';
import PageHome from './pages/PageHome';

//IMPORT CSS
import './index.css';
import './Fonts.css';

//IMPORT API PROVIDERS
import { BreakingNewsAPIProvider } from './breakingnews/BreakingNewsAPIProvider';
import { CyclopediaAPIProvider } from './cyclopedia/CyclopediaAPIProvider';
import { WebSiteAPIProvider } from './websites/WebSiteAPIProvider';
import { HowtoAPIProvider } from './howto/HowtoAPIProvider';

// import 'react-tooltip/dist/react-tooltip.css';
// import ReactDOM from 'react-dom';
// import App from './App';

const PrivateRoutes = () => {
  const { loggedInUserEmail } = useUserContext();

  return (
    loggedInUserEmail ? <Outlet /> : <Navigate to='/login' />
  );
};

const firebaseConfig = {
  apiKey: "AIzaSyCwDLcoI45eQU61Y7GVXlBDAx-3Du_gQuA",
  authDomain: "besterdev-432e9.firebaseapp.com",
  projectId: "besterdev-432e9",
  storageBucket: "besterdev-432e9.appspot.com",
  messagingSenderId: "352042484093",
  appId: "1:352042484093:web:3b62f25c3b000848720c14",
  measurementId: "G-FCGGY1NE36"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const App = () => {
  const [searchPhrase, setSearchPhrase] = useState();
  const [checkForRecords, setCheckForRecords] = useState(true);
  const username = 'besterdev-ui';
  const password = 'TZXWF498UR5PGQLH6E3CMBDNSYJAKV72';
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase')
      .then((response) => {
        const searchPhraseValue = response.data[0].searchphrase;
        setSearchPhrase(searchPhraseValue);
        console.log('In <index.js> is jou searchPhraseValue:', searchPhraseValue);
      }).catch((e) => console.error(e));
  }, [checkForRecords]);

  console.log('In <index.js> is jou basicAuth:', basicAuth)
  console.log('In <index.js> is jou searchPhrase:', searchPhrase);



  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/* <Route path='/search' element={<PageSearch />} /> */}
            {/* <Route path='/screen' element={<PageSearch />} /> */}
            {/* <Route path='/candidatemanage' element={<PageManage />} /> */}
            {/* <Route path='/logout' element={<PageLogout />} /> */}
            <Route path='/howtomanage' element={<PageHowtoManage />} />
            {/* <Route path='/hunt' element={<PageSearch />} /> */}
            <Route path='/cyclopediamanage' element={<PageCyclopedia />} />
            <Route path='/webresourcemanage' element={<PageResources />} />
            <Route path='/peoplescorecard' element={<PagePeopleScorecard />} />
            {/* <Route path='/taskmanage' element={<PageTaskManage />} /> */}
            {/* <Route path='/mycv' element={<PageMyCV />} /> */}
            {/* <Route path='/dhkeyexchange' element={<PageDHKeyExchange />} /> */}
          </Route>
          {/* <Route path='/taskedit/:task_id' element={<PageTaskEdit />} /> */}
          <Route path='/cyclopediaedit/:cyclopediaId' element={<PageCyclopediaEdit />} />
          <Route path='/howtoedit/:howto_id' element={<PageHowtoEdit />} />
          {searchPhrase && <Route path='/home' element={<PageHome searchPhrase={searchPhrase} />} />}
          {searchPhrase && <Route path='/login' element={<PageLogin searchPhrase={searchPhrase} />} />}
          {/* <Route path='/swagger' element={<PageSwagger />} /> */}
          {searchPhrase && <Route path='/' element={<PageLogin searchPhrase={searchPhrase} />} />}
          {searchPhrase && <Route path='*' element={<PageLogin searchPhrase={searchPhrase} />} />}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export const auth = getAuth(app);

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <BreakingNewsAPIProvider> */}
//       {/* <HowtoAPIProvider> */}
//         {/* <CyclopediaAPIProvider> */}
//           {/* <WebSiteAPIProvider> */}
//             <App />
//           {/* </WebSiteAPIProvider> */}
//         {/* </CyclopediaAPIProvider> */}
//       {/* </HowtoAPIProvider> */}
//     {/* </BreakingNewsAPIProvider> */}
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BreakingNewsAPIProvider>
      <HowtoAPIProvider>
        <CyclopediaAPIProvider>
          <WebSiteAPIProvider>
            <App />
          </WebSiteAPIProvider>
        </CyclopediaAPIProvider>
      </HowtoAPIProvider>
    </BreakingNewsAPIProvider>
  </React.StrictMode>
);

export default App;