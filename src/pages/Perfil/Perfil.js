import React, { useEffect, useState } from 'react'
import Titulo from '../../components/common/Titulo/Titulo'
import Image from 'mui-image';
import { Styler } from '../../components/Styler/Styler';
const Perfil = ({usuario}) => {

    useEffect(() => {
        
        console.log(usuario);
      },);
    
  return (
    <div  class="page" style={Styler.page}>
        <Titulo titulo={"Detalles de perfil"}></Titulo>
        { <Image src={usuario.foto} height="100px" width="100px" alt="img"/> }
        <h3>email:</h3><p>{usuario.email}</p>
        <h3>token:</h3><p> {usuario.token}</p>
        <h3>conexion:</h3><p> {usuario.conexion}</p>
        <h3>caducidad:</h3><p> {usuario.caducidad}</p>
        


    </div>
  )
}

export default Perfil