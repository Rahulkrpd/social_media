"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    // const [currentSlide, setCurrentSlide] = useState(0);
    const [isLogin, setIsLogin] = useState(false);

    const { loginUser,registerUser } = useAuth();

    const [registerData, setRegisterData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });



    const slides = [
        "/temp/slider 1.png",
        "/temp/slider 2.png",
        "/temp/slider 3.png"
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(registerData);
        try {
            await registerUser(registerData.name, registerData.email, registerData.password,registerData.username);
        } catch (error) {
            console.log(error);
        }

    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginData);
        try {
            await loginUser(loginData.email, loginData.password);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex h-screen w-full">
            {/* LEFT SIDE SLIDER */}
            <div className="hidden lg:flex w-1/2 relative bg-black justify-center items-center ">

                <div className="">
                    <Image
                        src={slides[currentSlide]}
                        alt="Slider Image"
                        width={800}
                        height={700}
                        className="  "
                    />

                </div>



                {/* Overlay for text and dots */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-8 text-white">

                </div>
            </div>


            {/* RIGHT SIDE FORM */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#100a18]/86 text-white">
                <Card className="w-full max-w-md p-8 shadow-lg rounded-2xl bg-[#100a18]/87">
                    <CardContent>
                        {isLogin ? (
                            <>
                                {/* LOGIN FORM */}
                                <h2 className="text-2xl font-bold mb-6 text-white">
                                    Log in
                                </h2>
                                <form className="space-y-4 text-white" onSubmit={handleLogin}>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full hover:bg-purple-900"
                                    >
                                        Log in
                                    </Button>
                                </form>

                                <p className="text-sm text-muted-foreground text-center mt-6">
                                    Don’t have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(false)}
                                        className="text-white underline "

                                    >
                                        Create account
                                    </button>
                                </p>
                            </>
                        ) : (
                            <>
                                {/* REGISTER FORM */}
                                <h2 className="text-2xl font-bold mb-6 text-white">
                                    Create an account
                                </h2>
                                <form className="space-y-4 text-white" onSubmit={handleRegister}>
                                    <div className="flex gap-4">
                                        <Input placeholder="Name" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
                                        <Input placeholder="Username" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
                                    </div>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm text-muted-foreground"
                                        >
                                            I agree to the{" "}
                                            <Link
                                                href="#"
                                                className="underline"
                                            >
                                                Terms & Conditions
                                            </Link>
                                        </label>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full hover:bg-purple-900"

                                    >
                                        Create account
                                    </Button>
                                </form>

                                <div className="my-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <span className="h-px w-16 bg-muted"></span>
                                    Or register with
                                    <span className="h-px w-16 bg-muted"></span>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-1/2"
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-1/2"
                                    >
                                        Apple
                                    </Button>
                                </div>

                                <p className="text-sm text-muted-foreground text-center mt-6">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(true)}
                                        className=" underline text-white"
                                    >
                                        Log in
                                    </button>
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}