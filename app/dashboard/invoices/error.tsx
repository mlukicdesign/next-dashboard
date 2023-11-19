'use client';


// accepts two props:
// errorL instance of JavaScript's Error object
// reset: a function that will reset the error boundary. Will try to re-render the route segment



import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className='text-center'>Something went wrong!</h2>
            <button className='mt-4 rounded-mg bg-blue-500 px-4 py-2 text-sm text-white transistion-color hover:bg-blue-400'
            onClick={
                // Attempt to recover by trying to re-render the invoices route
                () => reset()
            }
            >Try again</button>
        </main>
    );
}