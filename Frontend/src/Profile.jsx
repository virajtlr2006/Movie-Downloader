import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [Profile, setProfile] = useState({})
    const email = localStorage.getItem("email")

    // LogOut

    const logout = () => {
        localStorage.removeItem('email');
        alert("Profile logged out");
        navigate('/login');
    };
    const navigate = useNavigate()
    useEffect(() => {
        if (email) {
            const fetchUserData = async () => {

                try {
                    const response = await axios.get(`http://localhost:8080/api/profile/${email}`)
                    console.log(response);

                    setProfile(response.data);


                } catch (error) {
                    console.log(error);
                    navigate("/login")
                }
            }
            fetchUserData()
        } else {
            setProfile(null)
            navigate("/login")
        }
    }, [email, navigate])

    return (
        <div>
            {Profile.userdata && (
                <>
                    <p>{Profile.userdata.email}</p>
                    <p>{Profile.userdata.name}</p>
                </>
            )}

            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default Profile
