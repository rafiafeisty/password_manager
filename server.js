const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const { MongoClient } = require("mongodb");
const bodyparser=require("body-parser")
const cors=require("cors")

app.use(bodyparser.json())
app.use(cors())

const port=3000

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName="ciperOpera"

client.connect()

//getting all passwords
app.get('/',async (req,res)=>{
    const db=client.db(dbName)
    const collection=db.collection('password')
    const findResult=await collection.find({}).toArray()
    res.json(findResult)
})

//inserting passwords
app.post('/',async (req,res)=>{
    const password=req.body
    const db=client.db(dbName)
    const collection=db.collection('password')
    const findResult=await collection.insertOne(password)
    res.send({success:true})
})

//deleting passwords
app.delete('/',async(req,res)=>{
    const db=client.db(dbName)
    const collection=db.collection('password')
    const password=req.body
    const findResult=await collection.deleteOne(password)
    res.send({success:true,result:findResult})
})

app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`)
})
