'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const LoginPage = () => {

    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signIn('google', {callbackUrl: '/dashboard/candidatos?page=1'})
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-amber-50 from-25% via-red-500 via-60% to-red-700 p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <Card >
                    <CardHeader className="flex">
                        <Image src={'/banner.png'} alt='PROreclutamiento banner' width={800} height={400}></Image>
                        <CardTitle className="flex justify-center text-2xl">PROreclutamiento CRM</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col justify-center align-middle" onSubmit={handleSignIn}>
                            <Button type='submit' className='w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Iniciar sesion con Google
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
