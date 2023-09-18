import connectDB from "./utils/db";

const { app } = require("./app");
require("dotenv").config();


// create server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})