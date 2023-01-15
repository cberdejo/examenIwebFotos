

import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Titulo from '../../components/common/Titulo/Titulo';
import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Mapa from '../../components/Mapa/Mapa';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';


import { Styler } from '../../components/Styler/Styler';
import Typography from '@mui/material/Typography';



const Publicacion = ({usuario, publicacionId}) => {
    
    const [like, setLike] = useState(true)
    const [dislike, setDislike] = useState(true)
    const [numLikes,setNumLikes] = useState()
    const [pubSelected, setPubSelected] = useState()
    const [cargando, setCargando] = useState(true);
    const [logged, setLoggedState] = useState(usuario != "" ? true:false)
    const [comment, setComment] = useState("")

    const initPublicacion = async () => {
        //   const response = await axios.get("http://localhost:8000/publicaciones/id/" + publicacionId);
        const response = await axios.get("https://3hb1dm.deta.dev/publicaciones/id/" + publicacionId);
        setPubSelected(response.data);
        setCargando(false);



    }
    const initButtons = async () => {
        if (cargando === false){
            if (logged === false){
               
                setLike(true);
                setDislike(true);
            } else if (pubSelected.likes.includes(usuario)){
                setLike(true);
                setDislike(false);
            }else  if (pubSelected.likes.includes(usuario) === false){
                setLike(false);
                setDislike(true);
            }
            console.log("button like:" + like);
            console.log("button dislike:" + dislike);
            setNumLikes(pubSelected.likes.length);
            console.log(numLikes);
            
        }else{
            initButtons();
        }
       
    }

    const likePulsado = async () => {
       
        //axios.post("http://localhost:8000/publicaciones/" + pubSelected._id.$oid +"/like?string=" + usuario);
        axios.post("https://3hb1dm.deta.dev/publicaciones/" + pubSelected._id.$oid +"/like?string=" + usuario);
      
        setCargando(true);
        initPublicacion();
        console.log("like dado");
        
         
    };

    const dislikePulsado = async () => {
         //axios.post("http://localhost:8000/publicaciones/" + pubSelected._id.$oid +"/like?string=" + usuario);
         axios.post("https://3hb1dm.deta.dev/publicaciones/" + pubSelected._id.$oid +"/dislike?string=" + usuario);
       
         setCargando(true);
         initPublicacion();
         console.log("dislike dado");
        
    };

    const nuevoComentario = async () => {
       
        
       
           /*
             axios.post("http://localhost:8000/publicaciones/addComentario/" + pubSelected._id.$oid, 
                {
                "autor": usuario, 
                "texto" : comentario
                }
            );
            */

            axios.post("https://3hb1dm.deta.dev/publicaciones/addComentario/" + pubSelected._id.$oid, 
                {
                "autor": usuario, 
                "texto" : comment
                }
            );
      
            setCargando(true);
            initPublicacion();
            console.log("Nuevo comentario  " + comment);
            
             
      
    };
    const borrarComentario = async (comentario) => {
        // axios.post("http://localhost:8000/publicaciones/deleteComentario/" + pubSelected._id.$oid, comentario  );
        axios.post("https://3hb1dm.deta.dev/publicaciones/deleteComentario/" + pubSelected._id.$oid, comentario  );

        setCargando(true);
        initPublicacion();
        console.log("borrar comentario");
        

    };
        
        
    useEffect(() => {
       console.log("logged " + logged);
       
       initPublicacion();
       initButtons();
       
    }, [cargando]);

   
    if (cargando) {
        return (
          <div align="center" style={Styler.loading}>
            <CircularProgress />
          </div>);
        /******************************** MOSTRAR FILTROS Y FOTOS ********************************/
    } else {

        return (
            <div  class="page" style={Styler.page}>
            
                        
                <Container maxWidth="xl"  rowSpacing={3} columnSpacing={3}>
                    <Titulo titulo="Información" />
                    <h2>Autor: {pubSelected.autor}</h2>
                    <h2>{pubSelected.titulo}</h2>
                    <p>{(new Date(pubSelected.fecha.$date).toDateString())}</p>
                    <h4>{pubSelected.ubicacion}</h4>
                    <p><img src={pubSelected.foto} alt="image" /></p>
                    
                    <p><h3> Likes:{numLikes}</h3></p>
                    <h2>Descripcion</h2>
                    <Box
                        component="span"
                        sx={{
                        overflow: 'auto',
                        display: 'block',
                        p: 1,
                        m: 1,
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                        color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                        border: '1px solid',
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        height:"100px"
                        }}
                    >
                       
                        <Typography align = "justify" paragraph="true" overflor="scroll" height="1px"> {pubSelected.descripcion} </Typography> 
                    </Box>
            
                    <Button variant="outlined" color="success" disabled={like} onClick={() => likePulsado()}>Like</Button>
                    <Button variant="outlined" color="error"  disabled={dislike} onClick={() => dislikePulsado()}>Dislike</Button>
                    
                    <h2>Comentarios:</h2>
                    {pubSelected.comentarios.map(comentario => (
                      <div>
                        <h4> {comentario.autor} </h4>
                          <Box
                            component="span"
                            sx={{
                            overflow: 'auto',
                            display: 'block',
                            p: 1,
                            m: 1,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            height:"100px"
                            }}
                            >
                                
                                <Typography align = "justify" paragraph="true" overflor="scroll" height="1px"> {comentario.texto} </Typography> 

                         </Box>
                    
                
                        {comentario.autor === usuario &&
                            <div>
                                    <Button variant="contained"  color="error" disabled={logged !== true} onClick={() => borrarComentario(comentario)}>Borrar</Button>
                            </div>

                        }
                    
                  
                      </div>
                      
                      
                    
                    ))}
                    
                    <TextField fullWidth  label="Comentario nuevo"  disabled={logged !== true}  onChange={(value) => setComment(value.target.value)} multiline maxRows={4} variant="standard"/>
                     <Button variant="contained"  disabled={logged !== true} onClick={() => nuevoComentario()}>Comentar</Button>

                </Container>
                <h2>Ubicacion:</h2>
                <Container maxWidth="xl" sx={{ mb: 3 }}>
                    

                <Mapa publicaciones={[pubSelected]} />

                </Container>
            </div>
            
        )
    }
}

export default Publicacion

/*

*/