import React from 'react';
import 'antd/dist/antd.css';
import './FooterStyle.css';

function FooterComponent() {
  return (
    <div class='site-footer' >
      <img class='dcc-image' src='https://www.dcc.uchile.cl/sites/default/files/imagenes/logos/H-lfn.png' alt='none'></img>
      <div class='info'>
        <p class='title'><b>Departamento de Ciencias de la Computación</b></p>
        <p class='right-content'>Facultad de Ciencias Fisicas y Matematicas</p>
        <p class='right-content'>Universidad de Chile</p>
        <p class='right-content'>Beachef 851, Edificio Norte, Tercer Piso</p>
        <p class='right-content'>Santiago, Chile</p>
      </div>
      <div id='copyright'>DCC 2020 - Protegido bajo licencia Creative Commons</div>
    </div>
  );
}

export default FooterComponent;