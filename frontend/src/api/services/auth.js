import toast from "react-hot-toast"

export const login = async (formData,navigate) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch('http://localhost:5050/api/v1/auth/login',{
            method:'POST',
            body:formData,
        })
        const data = await res.json()
        console.log(data)
        if(data.success){
            toast.success("Login Successful")
            localStorage.setItem("userName",data?.data?.userName)
            localStorage.setItem('token', data?.token)
            navigate('/dashboard')
        }else{
            toast.error(data.message)
            console.log(data.message)
        }
    } catch (err) {
        console.log(err?.response?.data?.message)
    }
}