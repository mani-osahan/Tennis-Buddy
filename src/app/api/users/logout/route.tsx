import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true
            }
        );

        // Clear the token cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Expire the cookie immediately
            path: "/", // Ensure this matches the path used when the cookie was set
        });

        // Clear other session-related cookies if needed
        response.cookies.set("userId", "", {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        });

        response.cookies.set("isProfileComplete", "", {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        });

        return response;
    } catch (error: any) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
