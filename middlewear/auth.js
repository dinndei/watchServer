import pkg from 'jsonwebtoken'

//אימות משתמש
export const authenticate=(req,res,next)=>{
let token=req.header["access-token"];
if(!token)
return res.status(403).send("missing token")
try{
    req.user=pkg.verify(token,process.env.JWT_SECRET);
      next();
      
}
catch{
return res.status(401).send("token not approved")

}
}
//אימות מנהל
export const authenticateAdmin=(req,res,next)=>{
    let token=req.header["access-token"];
    if(!token)
    return res.status(403).send("missing token")
    try{
        let user=pkg.verify(token,process.env.JWT_SECRET);
        if(user.role=="ADMIN"){
            req.user=user;
        next();
        }
        else
    return res.status(403).send("not premited")

       
    }
    catch{
    return res.status(401).send("token not approved")
    
    }}