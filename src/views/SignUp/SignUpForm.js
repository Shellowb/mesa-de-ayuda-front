import React from 'react';

export const SignUpForm = ({onChange,onSubmit, user:{email,password1,password2}}) => (
  <form className="form" onSubmit={onSubmit}>
    <label htmlFor="email">Email</label>
    <input 
      type="text"
      id="email" 
      name="email" 
      value={email}
      onChange={onChange}
    />
    <label htmlFor="password1">Contraseña</label>
    <input 
      type="password" 
      name="password1" 
      id="password1" 
      value={password1}
      onChange={onChange}
    />
    <label htmlFor="password2">Contraseña</label>
    <input 
      type="password" 
      name="password2" 
      id="password2" 
      value={password2}
      onChange={onChange}
    />
    <input 
      type="submit"  
      value="Registrar"
    />
  </form>
);