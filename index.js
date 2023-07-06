const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { bookRouter } = require("./routes/books.routes");

const app = express();
app.use(express.json())
app.use(cors())

app.use("/book",bookRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
    console.log("server is runnig")
})