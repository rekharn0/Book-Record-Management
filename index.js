const express=require("express");
const {users}= require("./data/users.json");
const app=express();
const PORT = 8081;
app.use(express.json());
/*Create new user*/
app.post("/users",(req,res)=>{
      const id=req.body.id;
      const data=req.body;
      const user=users.find((element)=>element.id===id);
      if(user){
        return res.status(404).json({
            success:false,
           message: "User already exist",
              });
      }
      users.push(data);
      return res.status(201).json({
        success:true,
        message:"User added successfully",
        data:users,
      });
});

/*Get single user with id*/
app.get("/users/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((element)=>element.id===id);
    if(user){
      return  res.status(200).json({
            success: true,
           data:user,
        });
      }
   return res.status(404).json({
    success: false,
   message: "User doesnot exist",
      });
    
});

/* Get all users*/
app.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
       data:users,
    });

});
/*Base route*/
app.get("/",(req,res)=>{
       res.status(200).json({
        success:true,
        message:"Server is up and running",
       });
});
/*edit single user details using id*/
app.put("/users/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user=users.find((element)=>element.id===id);
    if(!user){
         return  res.status(404).json({
            success:false,
           message: "User doesnot exist",
              });
            }
     const updateUser= users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            };
        }
         return each;
        });
        return res.status(201).json({
            success:true,
            message:"User data updated successfully",
            data:updateUser,
        });
    });
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
