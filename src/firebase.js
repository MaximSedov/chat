import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { ref, onUnmounted, computed } from 'vue'
// конфигурация firebase
firebase.initializeApp({
    apiKey: "AIzaSyCRofJenw4iNLgOplSMjV_3WgmcYEVMhA0",
    authDomain: "chat-47e7e.firebaseapp.com",
    projectId: "chat-47e7e",
    storageBucket: "chat-47e7e.appspot.com",
    messagingSenderId: "520135229261",
    appId: "1:520135229261:web:6a8465b00d8c6cbef1c104"
});


const auth = firebase.auth()

// авторизация
export function useAuth() {
    const user = ref(null)
    const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
    onUnmounted(unsubscribe)
    const isLogin = computed(() => user.value !== null)

    const signIn = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(googleProvider)
    }

    const signOut = () => auth.signOut()

    return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)

/* firestore.collection("messages").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
       console.log(doc.data());
   });
});  */

export function useChat() {
    const messages = ref([])
    const unsubscribe = messagesQuery.onSnapshot(snapshot => {
        messages.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .reverse()
    })

    onUnmounted(unsubscribe)
    const { user, isLogin } = useAuth()

    const sendMessage = text => {
        if (!isLogin.value) return
        const { photoURL, uid, displayName } = user.value
        messagesCollection.add({
            userName: displayName,
            userId: uid,
            userPhotoURL: photoURL,
            text: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }


    return { messages, sendMessage }
}


/* const messagesPrivateCollection = firestore.collection('privateMessage')
const messagesPrivateQuery = messagesPrivateCollection.orderBy('createdAt', 'desc').limit(100)
export function usePrivateChat(){
    const messages = ref([])
    const unsubscribe = messagesPrivateQuery.onSnapshot(snapshot => {
        messages.value = snapshot.docs
        .map(doc => ({id: doc.id, ...doc.data()}))
        .reverse()
    })

    onUnmounted(unsubscribe)
    const {user, isLogin} = useAuth()

    const sendPrivateMessage = text => {
        if (!isLogin.value) return
        const { photoURL, uid, displayName } = user.value
        messagesPrivateCollection.add({
          userName: displayName,
          userId: uid,
          userPhotoURL: photoURL,
          text: text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      }

    return {messages, sendPrivateMessage}
} */
