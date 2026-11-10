const express =require("express");
const router =express.Router();

router.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"server is running",
        time: new Date().toISOString(),
    });
});
module.exports =router;