import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebaseConfig"

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, user => {
            if(user){
                setCurrentUser(user)
            }else{
                setCurrentUser(null)
            }
        })

        return () => unSubscribe()
    }, [])
    return currentUser
}

export default useCurrentUser