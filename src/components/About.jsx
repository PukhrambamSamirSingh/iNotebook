import React from 'react'

const About = () => {
    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">About Us</h1>
                    <p className="mt-5 text-xl text-gray-500 sm:text-center">
                        We are a team of passionate developers dedicated to creating amazing web applications.
                    </p>
                </div>
                <div className="mt-16 sm:flex sm:justify-center">
                    <div className="flex justify-center items-center bg-gray-800 rounded-full h-24 w-24">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-16 w-16 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <div className="mt-6 sm:mt-0 sm:ml-6">
                        <h2 className="text-xl font-bold text-gray-900 sm:text-center">Our Mission</h2>
                        <p className="mt-2 text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
