import React, { useEffect, useState } from 'react'
import { Styler } from '../../components/Styler/Styler';
import { CircularProgress, Slider, Typography } from '@mui/material';
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
  const [aparcamientos, setAparcamientos] = useState([]);
  const [aparcamientosFiltrados, setAparcamientosFiltrados] = useState([]);
  const [addressFilter, setAddressFilter] = useState("");


  const getAparcamientos = async () => {
    
    // const response = await axios.get("http:localhost:8000/aparcamientos");
    const response = await axios.get("https://3hb1dm.deta.dev/aparcamientos");
    setAparcamientos(response.data)
    setAparcamientosFiltrados(aparcamientos)
    setCargando(false);

  };

  const setDefault = () =>{
    setAparcamientosFiltrados(aparcamientos);
    
  };

  useEffect(() => {
    getAparcamientos();
    console.log(aparcamientos);
  }, [cargando]);

  
 
  /******************************** FILTROS ********************************/

 
  const handleSearchByAddress = () => {
    
    filterDataByAddress();
  }
  


  const filterDataByAddress = async () => {
    
   
      //const result = await  axios.get("http://localhost:8000/aparcamientos/direccion/" + addressFilter);         
      const result = await  axios.get("https://3hb1dm.deta.dev/aparcamientos/direccion/" + addressFilter);             
      setAparcamientosFiltrados(result.data);
      console.log(addressFilter)
      
  };

  
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
          <Container maxWidth="xl" spacing={2} sx={{ mb: 3 }}>
            <Titulo titulo="Bienvenido a ParkingNET" />
          
         
            <Typography  align = "justify" paragraph="true" overflor="scroll" height="1px" variant="subtitle1">Busca por direccion</Typography>
            <Grid container spacing={2} sx={{ paddingTop: '10px' , border: '1px solid' }}>
              <Grid item md={4}>
                <SearchBar
                  style={Styler.pads}
                  placeholder="Buscar por dirección"
                  onChange={(event) => setAddressFilter(event.target.value)}
                  searchBarWidth='720px'
                />
              </Grid>
             
              <Grid item md ={4} sx={{paddingLeft:'200px'}}>
                <Button variant="outlined" color="success" onClick={() => handleSearchByAddress()}>Buscar</Button>
                <Button variant="outlined" color="success" onClick={() => setDefault()}>Todas</Button>
              </Grid>
          
              
            </Grid>
          </Container>

           
          <h2>Parkings:</h2>
          <Container maxWidth="xl" sx={{ mb: 3 }}>
                      
          <Mapa aparcamientos={aparcamientosFiltrados} />                
          </Container>
          
          <Container>
          <Titulo titulo = "Detalles"/>  
                <Grid container   rowSpacing={3}  columnSpacing={3} align={"center"}>
                  
                {aparcamientosFiltrados.map(item => (
                    <div>
                      <h2>{item.nombre} </h2>
                      
                      <Card Card sx={{ width:'650px' ,  marginRight:'10px', marginBottom:'10px',  border: '3px solid #BF40BF' ,  padding:"5px"  ,  borderRadius: 5}} >
                        <CardMedia
                          image={item.foto}
                          title={item.titulo}
                        />
                        <CardContent>
                          <p>Ubicacion: {item.direccion}</p>
                          <p>latitud: {item.latitud} longitud:{item.longitud}</p>
                          <p>Capacidad: {item.capacidad}</p>
                          <p>libres: {item.libres}</p>
                          <p>correo: {item.correo}</p>
                
                          
                        </CardContent>
                          
                        
    
                      </Card>

                    </div>
                      
                  ))}
                  
                </Grid>

          </Container>
           
             
                

             
       
        </div >

        
        
      )

    
    
  }
}

export default Main

