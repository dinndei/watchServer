import pkg from 'jsonwebtoken'

export const generateToken=(user)=>{
    let token=pkg.sign(
        { id: user._id, userName: user.userName, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn:"60m"
        }
    )
    return token;
}