const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());

// connct to mongodb
const uri = `mongodb+srv://${process.env.DB_INFO}:${process.env.DB_INFO}@cluster0.l1pq8lk.mongodb.net/?retryWrites=true&w=majority`;
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

        app.delete('/upload/:id', async (req, res) => {
            const id = req.params.id;
            
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query)
            res.send(result)
           
        })

        // update data
        app.put('/upload/:id',async(req,res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const service = req.body;
            const option = {upsert: true};
            const updateReview = {
                $set: {
                    name: service.name,
                    service: service.service,
                   
                }
                
            }
            const result = await serviceCollection.updateOne(filter, updateReview, option);
            res.send(result)
        
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