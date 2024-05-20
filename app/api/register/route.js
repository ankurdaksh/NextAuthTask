import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the given name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message indicating that the user was registered
 *       500:
 *         description: An error occurred while registering the user
 */

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
  
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
