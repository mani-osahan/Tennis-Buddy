import User from "@/app/actions/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { select } from "@nextui-org/theme";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function GET(request:NextRequest) {
    try{

        const userId = await getDataFromToken(request)

        const user = await User.findOne({_id:userId}).select("-password")
        
        console.log(user)
        return NextResponse.json({message:"User found", data: user}, )

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 400})
    }
}

