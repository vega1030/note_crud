const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export async function login(){
    try {
        const response = await auth.signInWithPopup(provider)
        console.log(response)
        return response.user

    }
    catch (err){
        throw new Error(err)
    }
}

export function logout(){
    auth.logout();
}