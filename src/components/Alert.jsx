import React from 'react';

const Alert = ({ type, message }) => {
    let bgColor = '';
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            break;
        default:
            bgColor = 'bg-blue-500';
    }

    return (
        <div className={`${bgColor} text-white font-bold px-4 py-3 relative`} role="alert">
            <span className="block sm:inline">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg onClick={() => document.querySelector(`.${bgColor}`).classList.add('hidden')} className="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path
                        fillRule="evenodd"
                        d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 01-1.414 0l-.707-.707a1 1 0 010-1.414L7.586 10 4.657 7.071a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0L10 8.586l2.93-2.93a1 1 0 011.414 0l.707.707a1 1 0 010 1.414L12.414 10l2.93 2.929a1 1 0 010 1.414l-.707.707z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
        </div>
    );
};

export default Alert;
