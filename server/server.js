const express=require('express');
const path=require('path');

const indexPath=path.join(__dirname,'../public');


const app=express();

app.use(express.static(indexPath));

 app.listen(3000,()=>{
    console.log("server is listening on port 3000");});
