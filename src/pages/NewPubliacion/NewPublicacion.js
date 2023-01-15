import React, {useState} from 'react'
import { Button, TextField } from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'mui-image'
import Cloudinary from '../../components/Cloudinary/Cloudinary';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Titulo from '../../components/common/Titulo/Titulo';
import { Styler } from '../../components/Styler/Styler';

const defaultValues = {
    titulo: "titulo",
    imagen: "",
    descripcion: "",
    ubicuacion:"",
};

let color = "primary";

const NewPublicacion = ({usuario}) => {

    const navigate = useNavigate();
    const [values, setValues] = useState(defaultValues);
    
    const addFoto = (url) => {
        values.imagen = url;
    };

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required("Pon un titulo"),
        descripcion: Yup.string().required("Descripción Obligatoria").max(400, "400 caracteres máximo"),                                              // eslint-disable-line
        ubicacion: Yup.string(),                                              // eslint-disable-line
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    const addPublicacion = (data) => {
        console.log(values);
        if(values.imagen !== ""){
            // axios.post("http://localhost:8000/publicaciones/crear",
            axios.post("https://3hb1dm.deta.dev/publicaciones/crear",
                {

                    "autor" : usuario,
                    "titulo" : values.titulo,
                    "foto" : values.imagen,
                    "descripcion": values.descripcion, 
                    "ubicacion" : values.ubicuacion
                                      
                }).then(() => {
                    navigate("/")
                }).catch((response) =>{
                    console.log(response)
                });
        }else{
            color = "error";
        }
    };



    const handleChange = (value) =>(
        setValues(value)
    );
    
    return (
        <div class="page" style={Styler.page} >
            <Titulo titulo="Nueva publicacion" />
            <Container maxWidth="xl" sx={{ mb: 3 }}>

                <Grid container spacing={2} sx={{paddingTop: '10px'}}>
                    <Box sx={{maxWidth: '650px'}}>
                        <form onSubmit={handleSubmit(addPublicacion)} onKeyPress={e => { e.which === 13 && e.preventDefault() }} noValidate>

                            <Grid container spacing={2} sx={{ paddingRight: '10px', paddingBottom: '10px', border: 1, borderRadius: 5, borderColor: "#BF40BF"}}>
                                <Grid item md={5}><TextField placeholder='titulo' fullWidth label="Titulo" {...register('titulo')} error={errors.titulo ? true : false} helperText={errors.titulo?.message}  name='titulo' required onChange={(event) => handleChange({...values, titulo: event.target.value})}/></Grid>
                                <Grid item md={9}><TextField placeholder='Descripción'fullWidth multiline rows={3} maxrows={5} label="Descripción" {...register('descripcion')} error={errors.descripcion ? true : false} helperText={errors.descripcion?.message} name='descripcion' required onChange={(event) => handleChange({...values, descripcion: event.target.value})}/></Grid>
                                <Grid item md={7}><TextField placeholder='ubicacion' fullWidth label="Ubicacion" {...register('ubicacion')} error={errors.ubicuacion ? true : false} helperText={errors.ubicuacion?.message}  name='ubicuacion' required onChange={(event) => handleChange({...values, ubicuacion: event.target.value})}/></Grid>
                                <Grid item ><Cloudinary func={addFoto} color={color}/></Grid>
                            
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" sx={{marginTop: '20px'}}>Crear</Button>

                        </form>
                    </Box>
                </Grid>

            </Container>
           

        </div>
    )
    }

export default NewPublicacion