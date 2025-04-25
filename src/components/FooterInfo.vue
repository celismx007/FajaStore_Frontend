<script setup>
</script>

<template>
    <footer class="footer">
      <!-- Sección: Sobre Nosotros -->
       <!--
      <div class="fooer-section">
        <div class="logo">
            <router-link to="/">
              <br><br><br>
            <img src="../assets/LogoTiendaDelia.png" alt="logo de la tienda" class="logo-img">
            </router-link>
        </div>
      </div> -->
      <div class="footer-section">
        <h3><strong>Sobre Nosotros</strong></h3>
        <ul>
          <li><a href="#">Conoce a Moda Fajas By Delia</a></li>
          <li><a href="#">Nuestras tiendas</a></li>
          <li><a href="#">Conoce porqué comprar nuestras fajas</a></li>
          <li><a href="#">Descarga nuestro catálogo</a></li>
        </ul>
        <h3>Queremos Ayudarte</h3>
        <ul>
          <li><a href="#">Guía de tallas</a></li>
          <li><a href="#">Recomendaciones de uso y lavado</a></li>
          <li><a href="#">Cómo ponerse una faja</a></li>
          <li><a href="#">Estado de tu compra</a></li>
        </ul>
      </div>
      <!-- Sección: Contacto -->
      <div class="footer-section">
        <h3><strong>Contacto</strong></h3>
        <ul>
          <li><a href="#">Quiero ser distribuidor</a></li>
          <li><a href="#">Trabaja con nosotros</a></li>
          <li><a href="mailto:servicioalcliente@fajasmariae.com">Escríbenos: ModaFajasByDelia@gmail.com</a></li>
          <li><a href="https://wa.me/573013625549" target="_blank">Ventas por WhatsApp: +591 ....</a></li>
        </ul>
        <h3><strong>Síguenos</strong></h3>
        <ul class="social-links">
          <li><a href="#" target="_blank"><img src="../assets/iconFacebook.png" alt="Facebook" width="50px" height="50px"/></a></li>
          <li><a href="#" target="_blank"><img width="50px" height="50px" src="../assets/iconInstagram.png" alt="Instagram" /></a></li>
          <li><a href="#" target="_blank"><img width="50px" height="50px" src="../assets/iconTikTok.png" alt="Tiktok" /></a></li>
          <li><a href="#" target="_blank"><img width="50px" height="50px" src="../assets/IconX.png" alt="twiter" /></a></li>
        </ul>   
      </div>
          <!-- Sección: Mapa -->
      <div class="footer-section map-container">
        <h3><strong>Encuéntranos con Google Maps</strong></h3>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4686.474680684039!2d-63.162100510294536!3d-17.76563520121355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e701b92d53e3%3A0x55925a7836b457b7!2sModa%20Fajas!5e0!3m2!1ses!2sbo!4v1725175559460!5m2!1ses!2sbo" 
            width="600" height="450" style="border:0;" 
            allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
  

  
      <!-- Sección: Nuestras Políticas -->
      <div class="footer-section">
        <h3><strong>Nuestras Políticas</strong></h3>
        <ul>
          <li><a href="#">Cambios y devoluciones</a></li>
          <li><a href="#">Tratamiento de datos personales</a></li>
          <li><a href="#">Políticas de envío</a></li>
          <li><a href="#">Términos y condiciones de uso</a></li>
          <li><a href="#">Promociones vigentes</a></li>
        </ul>
      </div>
    </footer>
</template>  

<script>
</script>


<style scoped>

.footer {
  background: rgba(0, 0, 0, 0.808);
  padding: 50px 100px; /* Espaciado */
  display: flex;
  flex-wrap: wrap;
  justify-content: 10px; /* Espacio entre secciones */
  border-top: 1px solid #ddd; /* Línea superior */
  color: #F3F3F4; /* Texto dorado */
}

.footer-section {
  flex: 1 1 200px; /* Flexbox para distribuir secciones */
  margin: 5px 10px; /* Espaciado entre secciones */
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #F3F3F4; /* Títulos dorados */
}

.footer-section ul {
  list-style: none; /* Sin viñetas */
  padding: 0;
}

.footer-section li {
  margin: 8px 0;
}

.footer-section a {
  text-decoration: none;
  color: #F3F3F4  ; /* Enlaces dorados */
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #f39c12;
}

.social-links {
  justify-content: center;
  display: flex;
  gap: 20px; 
}

.social-links a {
  text-decoration: none;
}
.social-links img {
  width: 50px;
  height: 50px;
  transition: opacity 0.3s ease;
}
.social-links img:hover {
  opacity: 0.7; 
}

.map-container iframe {
  width: 100%;
  border: 0;
  height: 300px;
}

.logo-img {
  width: 100%;
  height: auto;
}
</style>