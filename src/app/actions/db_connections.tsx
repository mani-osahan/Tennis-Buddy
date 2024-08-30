import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'
import mongoose, { ConnectOptions } from 'mongoose'

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const username = encodeURIComponent("<username>");
const password = encodeURIComponent("<password>");
const clusterUrl = "tennisbuddy.15zupn2.mongodb.net"



const connectionParams= {
    useNewUrlParser: true,
    useUnifiedTopology: true
}



app.use(cors({
    origin: 'http://127.0.0.1"5500'
}))


const authMechanism = "DEFAULT"

app.use(express.json())
app.use(express.static('public'))



const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true}, 
    password: {type: String, required: true}
})
    
const User = mongoose.model('tb_users', userSchema)

userSchema.pre('save', async function(next: any){
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        next()
    }catch(error){
        next(error)
    }
})


app.post("/signup", async (req: NextApiRequest, res: NextApiResponse) => {

    try{
        const {emailAddress} = req.body

        const newUser = new User({username})

    }catch(error){
        
    }

})
export default function DBConnection(){

    return(
        <div>

        </div>
    )


}