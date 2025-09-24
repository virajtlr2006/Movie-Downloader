import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Inbox, Lock, LockIcon, LogOutIcon, Mail, Pen, PenBoxIcon, PenIcon, PersonStanding, User } from 'lucide-react'
import { LogOut } from 'lucide-react'
import Input from './Components/input'
import ProfileButton from './Components/ProfileButton'

const Profile = () => {
    const [Profile, setProfile] = useState({})
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    const token = localStorage.getItem("token")

    // LogOut

    const logout = () => {
        localStorage.removeItem('token');
        alert("Profile logged out");
        navigate('/login');
    };
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            const fetchUserData = async () => {

                try {

                    const response = await axios.post("http://localhost:8080/api/profile", { token })
                    console.log(response);

                    setProfile(response.data.profile);


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
    }, [token, navigate])

    return (
        <div className=' bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen  flex flex-col gap-10 px-8 lg:flex-row lg:px-10 pt-20 '>

            {/* Profile div */}
            <div className='bg-gray-800/50 mt-5  py-5  w-full flex flex-col items-center rounded-lg border-2 border-gray-800 lg:h-90 lg:px-5'>
                <div className='text-lg flex items-center'>
                    <label className='flex gap-2 font-semibold text-white pb-3 items-center'><User color='blue' className='text-blue-500' />Personal Information</label>
                </div>
                {Profile &&
                    <div className='flex flex-col gap-4 pt-3'>
                        {/* Name */}
                        <Input name={"name"} Icon={<User />} value={Profile.name} />

                        {/* Email */}
                        <Input name={"email"} Icon={<Mail />} value={Profile.email} />

                        {/* Password */}
                        <Input name={"password"} Icon={<Lock />} value={Profile.password} />

                    </div>}
            </div>


            {/* Action div */}
            <div className='bg-gray-800/50 mt-5  py-5 px-8 w-full flex flex-col items-center rounded-lg border-2 border-gray-800 lg:h-90 sm:pb-10'>
                <div className='text-lg flex items-center'>
                    <label className='flex gap-2 font-semibold text-white pb-3 items-center'><Pen color='blue' className='text-blue-500' />Account Actions</label>
                </div>

                <div className='w-full flex flex-col gap-4 lg:py-5'>
                    <ProfileButton name={"Edit Profile"} Icon={<Pen />} func={logout} color={"bg-blue-800"} />

                    <ProfileButton name={"Log Out"} Icon={<LogOutIcon />} func={logout} color={"bg-red-800"} />
                </div>
            </div>
        </div>
    )
}

export default Profile
