

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@mui/material';
import L from 'leaflet';
import { Styler } from '../Styler/Styler';

function defaultIcon() {
  return L.icon({
    iconUrl: require("../../images/mapmarker.png"),
    iconSize: [50, 50],
  });
};

const Mapa = ({ publicaciones }) => {
  const coordenadas = [40.41831, -3.70275];

  return (
    <Box sx={Styler.mapa}>
      <MapContainer
        class="leaflet-container"
        /*style={{ width: "100%", height: "70vh" }}*/
        center={coordenadas}
        zoom={4}
        removeOutsideVisibleBounds={false}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      {publicaciones.map((publicacion, idx) =>
        <div>
          {publicacion.lat !== null && publicacion.lon !== null &&
           <Marker
                  key={`publicacion-${idx}`}
                  position={[publicacion.lat, publicacion.lon]}
                  icon={defaultIcon()}>
                  <Popup>
                    {publicacion.titulo}
                  </Popup>
                </Marker>
          }
        </div>

        )}      
        
      </MapContainer>
    </Box>
  )
}

export default Mapa

/*

{articulos.map((articulo, idx) =>
          <Marker
            key={`articulo-${idx}`}
            position={[articulo.latitud, articulo.longitud]}
            icon={defaultIcon()}>
            <Popup>
              <TarjetaArticulo
                articulo={articulo}
                mayorPuja={(articulo.precio)}
                funcion={""}
                sonMios={0}
                textoBoton={"Pujar"}
              />
            </Popup>
          </Marker>
        )}


              */