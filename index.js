const express=require("express");
const app=express();
const PORT = 8081;
const userRouter=require("./routes/userRoutes.js");
const bookRouter=require("./routes/bookRoutes");
app.use(express.json());

/*Base route*/
app.get("/",(req,res)=>{
    res.status(200).json({
     success:true,
     message:"Server is up and running",
    });
});
app.use("/users",userRouter);
app.use("/books",bookRouter);
/*Generic route*/
app.get("*",(req,res)=>{
     res.status(404).json({
        success:false,
        message:"Route doesn't exist",
     });
});

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});
