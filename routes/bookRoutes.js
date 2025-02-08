const express=require("express");
const router=express.Router();
// const {books}=require("../data/books.json");
// const {users}=require("../data/users.json");
//console.log("Inside function:",date);
//Get all books information
router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Books Details",
        data:books,
            });
});
//Get issued books details
router.get("/issued",(req,res)=>{
    const userWithIssuedBooks=users.filter((each)=>{
        if (each.issuedBook) return each;
    }) 
    const issuedBooks=[];
    
    userWithIssuedBooks.forEach((each)=>{
        const bookDetails=books.find((book)=>book.id===each.issuedBook);
            bookDetails.issuedBy=each.name;
            bookDetails.issuedDate=each.issuedDate;
            bookDetails.returnDate=each.returnDate;
            issuedBooks.push(bookDetails);
        });
   if(issuedBooks.length==0){
    return  res.status(404).json({
        success:false,
        message: "No Books Issued Yet",
       });
   }
   return res.status(200).json({
    success:true,
    message:"Issued books details",
    data:issuedBooks,
   });
});

router.get("/subscription-details/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id==id);
    if(!user){
        return res.status(404).json({
           success:false,
           message: "User doesn't exist",
        });
    }
    const getDateInDays=(data,issueString)=>{
        console.log("Inside function data:",data);
        let date,startDate;
        if(data===" ")
          date= new Date();
        else {
            date= new Date(data);
        }
        console.log("Inside function date:",date);
        let days=Math.round(Math.abs(date/(1000*60*60*24)));
        console.log("Inside function days:",days);
        return days;
    };
    const subscriptionType=(date)=>{
        if(user.subscriptionType==="Basic"){
              date=date+90;
        }
        else if(user.subscriptionType==="Standard"){
            date=date+180;
        }
        else if(user.subscriptionType==="Premium"){
            date=date+365;
        }
        return date;
    };

   let returnDate=getDateInDays(user.returnDate);
   let currentDate=getDateInDays();
    let subscriptionUserDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiryDate=subscriptionType(subscriptionUserDate);
      console.log("issuedDate",getDateInDays(user.issuedDate));
     console.log("returnDate",returnDate);
     console.log("currentDate",currentDate);
     console.log("subscriptionDate",subscriptionUserDate);
     console.log("subscriptionExpiryDate",subscriptionExpiryDate);



  const data=
  {   ...user,
      isSubscriptionExpired : subscriptionExpiryDate<currentDate,
      daysLeftForExpiration:subscriptionExpiryDate<currentDate?0:subscriptionExpiryDate-currentDate,
     fine:returnDate<currentDate?subscriptionExpiryDate<currentDate?100:50:0,

  };
  return  res.status(200).json({
    success:true,
    message:"User subscription details",
    data,
  });

});
//Get book details with book id

router.get("/:id",(req,res)=>{
    const id=req.params.id;
    const bookRecord=books.find((each)=>each.id===id);
    if(!bookRecord){
        return  res.status(404).json({
                success:false,
                message: "Book Doesnot Exist",
               });
        
    }
    return res.status(200).json({
        success:true,
        message: "Book Found",
       data:bookRecord,
    });
});

//Create/Add a new book

router.post("/",(req,res)=>{
    const id= req.body.id;
    const newBookData=req.body;
    if(!newBookData){
        return res.status(404).json({
            success:false,
            message:"No Data to add",
        });
    }
    const bookRecord=books.find((each)=>each.id===id);
    if(bookRecord){
        return res.status(404).json({
            success:false,
            message:"Bookid already exist",
        });
    }
    books.push(newBookData);
    /* const allBooks={...books,newBookData};*/
    return res.status(201).json({
        success:true,
        message:"Book details added successfully",
        data:books,
    });
})
//Update a book by id 
router.put("/:id",(req,res)=>{
    const id= req.params.id;
    const {newBookData}=req.body;
    const bookRecord=books.find((each)=>each.id===id);
    if(!bookRecord){
        return res.status(404).json({
            success:false,
            message:"Book doesnot exist",
        });
    }
     const updateBookData=books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...newBookData,
            }
        }
        return each;
     })
     return res.status(201).json({
        success:true,
        message:"Book Data updated successfully",
        data:updateBookData,
    });

});


module.exports=router;