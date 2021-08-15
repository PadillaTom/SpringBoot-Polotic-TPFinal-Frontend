import React, {useEffect, useState} from 'react'
import axios from "axios";

const myAPI = "https://polotic-tpfinal.herokuapp.com/api/usuarios";

const fetchUsers = async(url) => {
const response = await axios.get(url);
const users = response.data;
}


const Homepage = () => {
    const [users, setUsers] = useState(null);

    useEffect(()=>{
        setUsers(fetchUsers(myAPI));
        console.log(users);
    },[])

    return (
        <div>
            Welcome to Mi Hotel
        </div>
    )
}

export default Homepage
