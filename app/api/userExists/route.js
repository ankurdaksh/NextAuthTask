import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/userExists:
 *   post:
 *     summary: Find a user by email
 *     description: Retrieves a user from the database based on their email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user to find
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the user
 *                   description: The found user
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message indicating that the user was not found
 *       500:
 *         description: An error occurred while finding the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message indicating the error
 */


export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/userExists:
 *   get:
 *     summary: Get all users
 *     description: Retrieves all users from the database.
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the user
 *                       name:
 *                         type: string
 *                         description: The user's name
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: The user's email address
 *       500:
 *         description: An error occurred while fetching users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message indicating the error
 */


export async function GET(req) {
  try {
    await connectMongoDB();
    let users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
