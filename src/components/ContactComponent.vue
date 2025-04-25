<template>
    <div class="contact-container">
      <p class="contact-title title">¿Necesitas Ayuda? <RouterLink class="contactus" to="/contact" ><span>Contáctanos!</span>
        </RouterLink>
      </p>
  
      <div class="contact-icons d-flex text-center">
        <a href="mailto:proyecto.inver24@gmail.com" class="contact-item">
          <i class="fas fa-envelope"></i>
          <span>Email</span>
        </a>
        <RouterLink to="/contact" class="contact-item">
          <i class="fas fa-list"></i>
          <span>Form</span>
        </RouterLink>
        <a href="https://wa.me/59179367210" target="_blank" class="contact-item">
          <i class="fab fa-whatsapp"></i>
          <span class="">WhatsApp</span>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  
  .title {
    font-family: 'Montserrat', sans-serif; 
    font-weight: 700; 
    font-size: 28px;
    color:   #17223B; 
    text-transform: uppercase;
  }
  
  .contactus {
    text-decoration: none;
  }
  
  .contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: white;
    margin-top: 20px;
  }
  
  .contact-container p {
    margin: 0;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.808);
    text-align: center;
  }
  
  .contact-title span {
    color: #FE8330;
  }
  
  .contact-icons {
    display: flex;
    justify-content: center; 
    align-items: center; 
    gap: 1.5rem; 
    margin-top: 15px;
    max-width: 300px; 
  }
  
  .contact-item {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    text-align: center;
    text-decoration: none;
    color:#F3F3F4;
    font-size: 12px;
    transition: transform 0.3s ease;
  }
  
  
  .contact-item i {
    font-size: 16px;
    display: block;
    margin-bottom: 3px;
    border-radius: 50%;
    padding: 10px;
    width: 40px;  
    height: 40px;
    background-color: rgba(0, 0, 0, 0.808);
    text-align: center;
    line-height: 16px;
  }
  
  .contact-item i:hover {
    color: #FE8330;
  }
  
  .contact-item span {
    display: block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.808);
  }
  
  .contact-item:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    .contact-container p {
      font-size: 14px;
    }
  
    .contact-icons {
      gap: 1rem;
    }
  
    .contact-item i {
      font-size: 14px;
      padding: 8px;
      width: 35px;
      height: 35px;
    }
  
    .contact-item span {
      font-size: 10px;
    }
  
    .whatsapp-icon i {
      font-size: 14px; 
      padding: 8px;
      width: 35px;
      height: 35px;
    }
  }
  
  @media (max-width: 480px) {
    .contact-container {
      padding: 10px;
    }
  
    .contact-container p {
      font-size: 12px;
    }
  
    .contact-icons {
      gap: 0.5rem;
    }
  
    .contact-item i {
      font-size: 12px;
      padding: 6px;
      width: 30px;
      height: 30px;
    }
  
    .contact-item span {
      font-size: 8px;
    }
  
    .whatsapp-icon i {
      font-size: 12px; 
      padding: 6px;
      width: 30px;
      height: 30px;
    }
  }
  </style>
  