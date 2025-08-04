import React from 'react'

import Button from './Button'
import Container from './Container'

function Signup() {
    return (
        <Container>
            <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10`}>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <button
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                    {/* {error && <p className='text-red-600 mt-8 text-center'>{error}</p>} */}


                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <label htmlFor="username" className='text-left mt-10'>Username</label>
                            <input
                                id="username"
                                type="text"
                                className='border-0 border-gray-300 rounded p-2 shadow-md'
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <label htmlFor="email" className='text-left '>Email</label>
                            <input
                                id="email"
                                type="email"
                                className='border-0 border-gray-300 rounded p-2 shadow-md'
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <label htmlFor="password" className='text-left'>Password</label>
                            <input
                                id="password"
                                type="password"
                                className='border-0 border-gray-300 rounded p-2 shadow-md'
                                placeholder='Enter your password'
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full mt-3">
                            Create Account
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Signup