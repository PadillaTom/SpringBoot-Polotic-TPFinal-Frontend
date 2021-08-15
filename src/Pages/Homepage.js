import React, {useEffect, useState} from 'react'
import axios from "axios";

const myAPI = "https://polotic-tpfinal.herokuapp.com/api/usuarios";

const Homepage = () => {
    const [users, setUsers] = useState();

    const fetchUsers = async(url) => {
        const response = await axios.get(url);
        setUsers(response.data);
    }
    useEffect(()=>{
        fetchUsers(myAPI);        
    },[])
    console.log(users);

    return (
        <div>
            Welcome to Mi Hotel
        </div>
    )
}

export default Homepage
