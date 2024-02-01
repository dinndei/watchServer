export const errorHandling=((err,req,res,next)=>{
res.status(err.status||500);
res.send("errorHandler got an error"||err.message);
})