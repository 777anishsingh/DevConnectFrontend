import React from 'react'
import AuthForm from './AuthForm'
import { Meteors } from './ui/meteors'

const Login = () => {

    return (
        <>
            <AuthForm />
            <Meteors number={30} />
        </>
    )
}

export default Login