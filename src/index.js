const express=require("express")
const {PORT}=require("./config/serverConfig")
const db=require("./models/index")
const router=require("./routes/index")
const bodyParser=require("body-parser");
const app=express();
const prepareAndStartServer=()=>{
    app.listen(PORT,()=>{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use("/api",router)
        console.log("Started server in",PORT)
        // db.sequelize.sync({alter:true})
    })
}
prepareAndStartServer();