import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth
} from "firebase/auth";
import { auth } from "../firebaseCliente.js";

export function registrarFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutFirebase() {
  return signOut(auth);
}

export function escucharSesionFirebase(callback) {
  return onAuthStateChanged(auth, callback);
}

export const obtenerToken = async () => {
  const auth = getAuth();
  const usuario = auth.currentUser;
  if (usuario) {
    // El token expira cada hora, esto lo refresca automáticamente si es necesario
    return await usuario.getIdToken();
  }
  return null;
};