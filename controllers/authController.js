// libaries


const register = async (req, res) => {
    try{
        // all ok
        res.status(200).json({message:"Register route"})
    }catch(err){
        console.log(err)
        res.status(200).json({message:"internal server error",err})
    }
}


module.exports = {register}