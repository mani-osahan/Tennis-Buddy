import mongoose from "mongoose";

export async function connect() {
  try{
    await mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on('connected', () => {
        console.log(`Connected to the TennisBuddy DataBase`);
    })
    connection.on('error', (error) => {
        console.error(`Error Connecting to Database ${error}`);
        process.exit()
    })
}catch(error){
    console.error(`Error Occurred on connection | ${error}`)
}
}

// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://rbrpaneihlrpnawntlby.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY!
// const supabase = createClient(supabaseUrl, supabaseKey)

// export default supabase