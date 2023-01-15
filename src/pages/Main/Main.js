import React, { useEffect, useState } from 'react'
import { Styler } from '../../components/Styler/Styler';
import { CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import Titulo from '../../components/common/Titulo/Titulo';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@mui/material/CardActions';
import Mapa from '../../components/Mapa/Mapa';


const Main = ({usuario, pubSelected}) => {

  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);

 

  const getPublicaciones = async () => {
    
    // const response = await axios.get("https://3hb1dm.deta.dev/publicaciones");
    const response = await axios.get("https://3hb1dm.deta.dev/publicaciones");
    setPublicaciones(response.data)
    setPublicacionesFiltradas(publicaciones)
    setCargando(false);

  };

  const setDefault = () =>{
    setPublicacionesFiltradas(publicaciones);
    
  };

  useEffect(() => {
    getPublicaciones()
  }, [cargando]);

  const handleButton = (item) =>{
    console.log(item);
    pubSelected(item._id.$oid);
    navigate("/publicacion");
  };
 
  /******************************** FILTROS ********************************/

  const handleSearchByTitulo = (value) => {
    filterDataByTitulo(value);
  };
  const handleSearchByAutor = (value) => {
    filterDataByAutor(value);
  }

  const filterDataByTitulo = async (value) => {
    
    console.log("publicaciones " + publicaciones.at(0).titulo);

    if (value !== ""){
      //const result = await  axios.get("http://localhost:8000/publicaciones/titulo/" + value);         
      const result = await  axios.get("https://3hb1dm.deta.dev/publicaciones/titulo/" + value);             
      setPublicacionesFiltradas(result.data);
     
      console.log(value);
     }else{
       setDefault();
       
     }
    
  };

  const filterDataByAutor = async (value) => {
    
    console.log("publicaciones " + publicaciones.at(0).titulo);

    if (value !== ""){
      //const result = await  axios.get("http://localhost:8000/publicaciones/autor/" + value);         
      const result = await  axios.get("https://3hb1dm.deta.dev/publicaciones/autor/" + value);             
      setPublicacionesFiltradas(result.data);
     
      console.log(value);
     }else{
       setDefault();
       
     }
    
  };
  const handleDelete = (value) => {
    deletePub(value);
  };

  const deletePub = async (value) => {
    //axios.delete("http://localhost:8000/publicaciones/" + value);
    axios.delete("https://3hb1dm.deta.dev/publicaciones/" + value);
    console.log("Publicacion eliminada");
    setCargando(true);
    getPublicaciones();
  }
 

  /******************************** CARGANDO ********************************/
  if (cargando) {
    return (
      <div align="center" style={Styler.loading}>
        <CircularProgress />
      </div>);
    /******************************** MOSTRAR FILTROS Y FOTOS ********************************/
  } else {
    
      return (
        <div class="page" style={Styler.page}>
          <Container maxWidth="xl" sx={{ mb: 3 }}>
            <Titulo titulo="Bienvenido a APP" />
  
  
            <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
              <Grid item md={3}>
                <SearchBar
                  style={Styler.pads}
                  placeholder="Buscar por nombre de publicacion"
                  onChange={(event) => handleSearchByTitulo(event.target.value)}
                  searchBarWidth='720px'
                />
  
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
              <Grid item md={3}>
                <SearchBar
                  style={Styler.pads}
                  placeholder="Buscar por nombre de autor"
                  onChange={(event) => handleSearchByAutor(event.target.value)}
                  searchBarWidth='720px'
                />
  
              </Grid>
            </Grid>
            </Container>

            <Box >

              <Grid container rowSpacing={3}  columnSpacing={2} align={"center"}>

              {publicacionesFiltradas.map(item => (
                <div>
                  <h2>{item.autor} </h2>
                  
                  <Card Card sx={{ width:'650px' , height:'800px' ,  marginRight:'10px', marginBottom:'10px',  border: '3px solid #BF40BF' ,  padding:"5px"  ,  borderRadius: 5}} >
                    <CardMedia
                      image={item.foto}
                      title={item.titulo}
                    />
                    <CardContent>
                      <h2>{item.titulo}</h2>
                      <p>Ubicacion: {item.ubicacion}</p>
                      <p>Fecha: {(new Date(item.fecha.$date).toDateString())}</p>
                      <Box sx={{overflow: 'auto', p:1, m:1, height:"475px"}}> <img src={item.foto} alt="image" /></Box>
                      <p><h3>Likes:{item.likes.length}</h3></p>
                      <p><h3>Comentarios:{item.comentarios.length}</h3></p>
                    </CardContent>
                      
                    <CardActions>
                    <Button variant="contained" onClick={() => handleButton(item)}>Ver mas</Button>

                    {usuario === item.autor && 
                      <div>
                        <Button variant="contained" color="error" onClick={() => handleDelete(item._id.$oid)}>Borrar</Button>
                      </div>

                    }
                    </CardActions>
 
                  </Card>

                </div>
                  
              ))}
                
              </Grid>

             </Box>
         
              <h2>Publicaciones:</h2>
              <Container maxWidth="xl" sx={{ mb: 3 }}>
                      
              <Mapa publicaciones={publicacionesFiltradas} />                
              </Container>
          

         
        </div >
        
      )

    
    
  }
}

export default Main

