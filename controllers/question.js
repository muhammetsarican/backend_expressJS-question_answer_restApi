const home=(req, res, next)=>{
    res
    .status(200)
    .json({
        seccess: true
    })
}

module.exports=({home});