import { User } from './../user';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup,GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore : Firestore) { }

  async register({ email, password }: any): Promise<UserCredential> {
    // Registro de usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    // Después de la creación del usuario, obten su información
    const user = userCredential.user;

    // Crea un documento en Firestore para el usuario con el campo "experiencia"
    const userRef = doc(this.firestore, 'users', user.uid);
    await setDoc(userRef, { xp: 0 });

    return userCredential;
  }

  login({email, password} : any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout(){
    return signOut(this.auth);
  }

  saveUser( user : User){
    const userRef = collection(this.firestore,'users');
    return addDoc(userRef, user);
  }

  async incrementUserExperience(userId: string): Promise<void> {
    const userRef = doc(this.firestore, 'users', userId);

    try {
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data() as User;
        const currentExperience = userData.xp || 0;
        const newExperience = currentExperience + 1;

        await setDoc(userRef, { xp: newExperience }, { merge: true });
      } else {
        // El documento del usuario no existe, puedes manejar este caso si es necesario
        console.error('El documento del usuario no existe.');
      }
    } catch (error) {
      console.error('Error al incrementar la experiencia del usuario:', error);
    }
  }

}
