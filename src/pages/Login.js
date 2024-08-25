import React from 'react';
import backgroundImage from '../assets/auth_img.jpg'; // Caminho para a imagem de fundo

function Login() {
  return (
    <div 
      className="h-full flex-1 p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

    </div>
  );
}

export default Login;
