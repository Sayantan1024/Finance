import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Container from './Container'
import Button from './Button'

function Login() {

  const [username, setUsernname] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container>
      <h2 className='text-center text-2xl font-medium text-shadow-md '>Welcome Back!</h2>
      <div className='p-5'>
        <div className='py-3'>
          <Button className='bg-gray-200 hover:shadow-md w-78' textColor='black'>Login with Google</Button>
        </div>
      </div>
      <div className="relative text-center text-sm after:content-[''] after:absolute after:inset-x-0 after:top-1/2 after:border-t after:border-border after:z-0">
        <span className="bg-white relative z-10 p-1.5">
          Or continue with
        </span>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <label htmlFor="email" className='text-left mt-10 text-shadow-2xl'>Email</label>
          <input
            id="email"
            type="email"
            className='border-0 border-gray-300 rounded p-2 shadow-md'
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <label htmlFor="password">Password</label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <input 
            id="password" 
            type="password"
            className='border-0 border-gray-300 rounded p-2 shadow-md'
            placeholder='Enter your password'
            required 
          />
        </div>
        <Button type="submit" className="w-full mt-3">
          Login
        </Button>
      </div>
      <p className="mt-4 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <button className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign Up
          </button>
      </p>
    </Container>
  )
}

export default Login