import { useState, useEffect } from "react";
import { auth } from "./firebaseCliente.js"; // Asegúrate de exportar auth desde tu config
import { onAuthStateChanged } from "firebase/auth";
import LoginFirebase from "./components/LoginFirebase.jsx";

function App() {
  const [usuario, setUsuario] = useState(null);

  // Escuchar si el usuario inicia o cierra sesión
  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
    });
    return () => desuscribir();
  }, []);

  return (
    <div className="App">
      {/* Ahora pasamos el estado al componente */}
      <LoginFirebase usuario={usuario} />
    </div>
  );
}

export default App;
