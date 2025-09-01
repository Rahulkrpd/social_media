import dbConnect from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(req: Request) {

    try {
        await dbConnect();
        const { name, username, email, password, avatar, bio } = await req.json();


        if (!name || !email || !password || !username) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newuser = await User.create({
            name,
            username,
            email,
            password: hashPassword,
            bio,
            avatar

        })

        return NextResponse.json({ message: "User registered", user: newuser }, { status: 201 });


    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred In registered user ';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}