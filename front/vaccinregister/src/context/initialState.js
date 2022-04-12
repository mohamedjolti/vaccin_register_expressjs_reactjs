export  const initialState={
    isLogged:localStorage.getItem("isLogged")  ? localStorage.getItem("isLogged") : false,
    message:"",
    token:localStorage.getItem("token")
}