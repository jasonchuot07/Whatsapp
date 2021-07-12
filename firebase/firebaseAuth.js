import { useAuthState } from "react-firebase-hooks/auth"

const { auth } = require("./firebase")

const logout = () => {
    auth.signOut()
}

// const [user] = useAuthState(auth)
const currentUser = () => {
    const [user] = useAuthState(auth)
    return user
}
export {logout, currentUser}