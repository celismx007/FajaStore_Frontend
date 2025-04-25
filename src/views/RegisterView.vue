<script setup>
import { ref } from 'vue'
import axios from 'axios';

const userRegister = ref({
    email: '',
    lastName: '',
    name: '',
    password: '', 
});
const baseUrl = import.meta.env.VITE_BASE_URL;
const confirmPassword = ref('');
const errorMessage = ref(''); 

const handleRegister = async () => { 
    if (password.value !== confirmPassword.value) { 
        errorMessage.value = 'las contrasenias no coinciden'; 
        return; 
    }
    try { 
        const response = await axios.get(baseUrl+"user",  userRegister.value);
        console.log('Usuario registrado:', response.data);
        //redirigir a la home page una vez registrado 
        //router.push('/login')
        alert('usuario creado exitosamente');
        resetData();
    } catch (e) {
        console.error('erroro en el registro: ', e);
    }
}; 

const resetData = () => {
  userRegister.value = {
    email: '',
    lastName: '',
    name: '',
    password: '', 
  };
  confirmPassword.value = '';
  errorMessage.value = '';
}
</script>

<template>
    <div class="register-container shadow">
        <h2>Registro</h2>
        <br>
        <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-group">
                <label for="firstName">Nombre:</label>
                <input type="text" id="firstName" v-model="userRegister.name" required />
            </div> 
            <div class="form-group">
                <label for="lastName">Apellidos:</label>
                <input type="text" id="lastName" v-model="userRegister.lastName" required />
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" v-model="userRegister.email" required />
            </div>
            <div class="form-group">
                <label for="password">Contrasenia:</label>
                <input type="password" id="password" v-model="userRegister.password" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Repetir contrasenia:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </div>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
            <br>
            <button type="submit" class="register-button">Registrarse</button>
             
        </form>
    </div>
</template>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  max-width: 500px;
  margin: 50px auto;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-weight: 600; 
  color: black;
}

.register-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: black;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #f1c40f;
  outline: none;
}

.error-message {
  color: #ff6b6b;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
}

.register-button {
  width: 60%;
  padding: 12px;
  background-color: black;
  color: #f1c40f;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  color: #e7723c;
}
</style>
