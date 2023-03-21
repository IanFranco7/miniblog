import {db} from "../firebase/config"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState,useEffect} from 'react'

export const useAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if (cancelled){
            return;
        }
    }

    const createUser = async (data) =>{
        checkIfIsCancelled()

        setLoading(true)
        setError(null)
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            
            await updateProfile(user, {
                displayName: data.displayName
                })

            setLoading(false)

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemError

            if(error.message.includes("Password")){
                systemError = ' A senha precisa conter pelomenos 6 caracteres'
            }else if(error.message.includes("email-already")){
                systemError = 'E-mail já cadastrado'
            }else{
                systemError = 'Ocorreu um erro, por favor tente mais tarde.'
            }
            setLoading(false)
            setError(systemError)

        }

    }
    //logout
    const logout = () =>{
        checkIfIsCancelled()
        signOut(auth)
    }

    //login 


    const login = async (data)=>{
        checkIfIsCancelled()
        setLoading(true)
        setError(false)
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            
            let systemError
            if(error.message.includes("user-not-found")){
                systemError = "usuario não encontrado"
            }else if(error.message.includes("wrong-password")){
                systemError = "Senha incorreta"
            }else {
                systemError = "Ocorreu um erro, por favor tente mais tarde."
            }

            setError(systemError)
            setLoading(false)
        }
    }
    
    useEffect(() =>{
        return() => setCancelled(true)
    }, [])

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}