import { useContext,useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import {
    login,
    register,
    logout,
    getMe
} from '../service/auth.api.js'

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    const handleLogin = async({email,password}) =>{
        setLoading(true)
        try{
            const data = login({email,password})
            setUser(data.user)
        }catch(err){

        }finally{
            setLoading(false)
        }
    }

    const handelRegistration = async({email,password,username}) => {
        setLoading(true)
        try {
            const data = await register({username,email,password})
            setUser(data.user)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }

    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return{
        user,
        loading,
        handelRegistration,
        handleLogin,
        handleLogout
    }


}