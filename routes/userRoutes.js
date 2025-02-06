const express=require("express");
const router= express.Router();
const {users}= require("../data/users.json");
/*Create new user*/
router.post("/",(req,res)=>{
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
router.get("/:id",(req,res)=>{
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
router.get("/",(req,res)=>{
  res.status(200).json({
      success:true,
     data:users,
  });

});

/*edit single user details using id*/
router.put("/:id",(req,res)=>{
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
  /*Delete a specific user using id*/
router.delete("/:id",(req,res)=>{
  const {id}=req.params;
  const user=users.find((each)=>each.id===id);
  if(!user){
      return res.status(404).json({
          success:false,
          message:"User doesnot exist",
      });
  }
  const index=users.indexOf(user);
  users.splice(index,1);
  return res.status(200).json({
      success:true,
      message:"USer Deleted Successfully",
  });

});

module.exports=router;

