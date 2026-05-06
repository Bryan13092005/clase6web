import { useState } from "react";
import {
  loginFirebase,
  registrarFirebase,
  logoutFirebase
} from "../services/firebaseAuthService";
import ProductoPrincipal from "./ProductoPrincipal.jsx";
import "./loginFirebase.css";
function LoginFirebase({ usuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrar = async () => {
    try {
      await registrarFirebase(email, password);
      setMensaje("Usuario registrado correctamente");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const ingresar = async () => {
    try {
      await loginFirebase(email, password);
      // No pongas un return aquí. Firebase actualizará al 'usuario' automáticamente.
    } catch (error) {
      setMensaje(error.message);
    }
  };

  // 1. Si hay usuario, mostramos el ProductoPrincipal
  if (usuario) {
    return (
      <section>
        <button onClick={logoutFirebase} className="logOut">Cerrar sesión</button>
        <hr />
        <ProductoPrincipal />
      </section>
    );
  }

  // 2. Si NO hay usuario, mostramos el formulario
    return (
    <section className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bienvenido</h2>
        <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
        
        <form className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email"
              placeholder="correo@ejemplo.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              placeholder="••••••••" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className="button-group">
            <button type="button" className="btn-primary" onClick={ingresar}>
              Ingresar
            </button>
            <button type="button" className="btn-secondary" onClick={registrar}>
              Registrarse
            </button>
          </div>
        </form>
        
        {mensaje && <p className="login-message">{mensaje}</p>}
      </div>
    </section>
  );

}

export default LoginFirebase;