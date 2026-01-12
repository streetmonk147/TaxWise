import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { companyName, email, password, tin } = body

    // Validate input
    if (!companyName || !email || !password) {
      return NextResponse.json(
        { error: "Company name, email, and password are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    // Validate TIN if provided
    if (tin && !/^\d{10}$/.test(tin)) {
      return NextResponse.json(
        { error: "TIN must be exactly 10 digits" },
        { status: 400 }
      )
    }

    // Check if TIN is already in use
    if (tin) {
      const existingCompany = await prisma.company.findUnique({
        where: { tin },
      })

      if (existingCompany) {
        return NextResponse.json(
          { error: "TIN already registered" },
          { status: 400 }
        )
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Calculate trial end date (14 days from now)
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 14)

    // Create company and user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create company
      const company = await tx.company.create({
        data: {
          name: companyName,
          email,
          tin: tin || null,
          subscription_tier: "FREE",
          trial_ends_at: trialEndsAt,
        },
      })

      // Create user (owner)
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "OWNER",
          company_id: company.id,
        },
      })

      return { company, user }
    })

    return NextResponse.json(
      {
        message: "Account created successfully",
        userId: result.user.id,
        companyId: result.company.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
