import './App.css';
import React, { useState } from 'react';
import MainAppBar from './components/MainAppBar/MainAppBar';
import Pie from './components/common/Pie/Pie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Main from "./pages/Main/Main";
import Publicacion from './pages/Publicacion/Publicacion';
import NewPublicacion from './pages/NewPubliacion/NewPublicacion';

function App() {
  const [user, setUser] = useState("");
  const [publicacionSeleccionada, setPublcacion] = useState();
  const idCliente = "922880846069-52lfplvtl0in8495pre52fmcu7sntidm.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={idCliente}>
      <BrowserRouter>
        <MainAppBar
          login={setUser}
        />
        <Routes>
          <Route path="" element={<Main usuario = {user} pubSelected={setPublcacion} />} />
          <Route path="publicacion" element={<Publicacion usuario={user} publicacionId={publicacionSeleccionada} />} /> 
          <Route path="newPublicacion" element={<NewPublicacion usuario={user} />} />
         
        </Routes>
      </BrowserRouter>
      <Pie texto="Aplicacion de chris : )" />
    </GoogleOAuthProvider>
  );
}


export default App;


/*
PODRÍA PASAR EN VEZ DEL ID, LA PUBLICACION ENTERA SI ES SOLO PARA MOSTRAR INFORMACIÓN
 

Google Auth (tiene que ser con mi gmail): 
https://developers.google.com/identity/sign-in/web/sign-in
id cliente: 
922880846069-52lfplvtl0in8495pre52fmcu7sntidm.apps.googleusercontent.com

  const responseGoogle = response => {
    console.log(response);
  };

<GoogleLogin
          clientId="922880846069-52lfplvtl0in8495pre52fmcu7sntidm.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
        
*/

/*
<Route path="" element={<Main />} />
<Route path="Anuncios"element={<MisAnuncios/>}/>
        <Route path="Mis Viviendas"  element={<MisViviendas usuario={user}/>} />
        <Route path="Mis Viviendas/Nueva Vivienda" element={<NewHouse usuario={user}/>}  />
        <Route path="Vivienda/:id" element={<InfoVivienda usuario={user}/>} />
*/