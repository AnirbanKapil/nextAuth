import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { NextRequest , NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()


export async function GET (request : NextRequest) {
     const userId = getDataFromToken(request)

     const user = await User.findOne({_id : userId}).select("-password")
     if(!user){
        throw new Error("User not found")
     }

     return NextResponse.json({message : "User found" , Data : user})
}