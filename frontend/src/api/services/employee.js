import toast from "react-hot-toast"

export const getEmployee = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch('http://localhost:5050/api/v1/employee/getEmployee', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json()
        if (!data.success) {
            console.log(data.message)
            return
        }
        return data
    } catch (err) {
        console.log(err)
        return
    }
}

export const createEmployee = async (formData,navigate) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch('http://localhost:5050/api/v1/employee/createEmployee', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type':'multipart/form-data'
            },
            body: formData
        })
        const data = await res.json()
        console.log(data)
        if (!data.success) {
            console.log(data.message)
            toast.error(data.message)
            return
        }
        toast.success("Employee Created Successfully")
        navigate('/dashboard/employeeList')
    } catch (err) {
        console.log(err)
        return
    }
}

export const editEmployee = async (formData,navigate) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch('http://localhost:5050/api/v1/employee/editEmployee', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type':'multipart/form-data'
            },
            body: formData
        })
        const data = await res.json()
        console.log(data)
        if (!data.success) {
            console.log(data.message)
            toast.error(data.message)
            return
        }
        toast.success("Employee Updated Successfully")
        navigate('/dashboard/employeeList')
    } catch (err) {
        console.log(err)
        return
    }
}


export const deleteEmployee = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(`http://localhost:5050/api/v1/employee/deleteEmployee/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        if (!res.success) {
            console.log(data.message)
            toast.error(data.message)
            return
        }
        toast.success("Employee Deleted Successfully")
    } catch (err) {
        console.log(err)
        return
    }
}