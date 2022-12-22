const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());

// connct to mongodb
const uri = "mongodb+srv://allTask123:allTask123@cluster0.l1pq8lk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try{

        const serviceCollection = client.db('AllTask').collection('crudPostData')

        app.post('/uploadData',async(req,res)=>{
            const data = req.body
            const result = await serviceCollection.insertOne(data);
            res.send(result)

        })

        app.get('/upload',async(req,res)=>{

            const query = {}
            const result = await serviceCollection.find(query).toArray()
            res.send(result);
        })


    }finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(port,()=>{
    console.log('listening on port',port);
});