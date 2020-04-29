/**
 * custom CORS middleware
 * if accessed app is not in the whitelist, block entry
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) =>{
    const whitelist = [process.env.PRODUCTION_FRONT_END,process.env.DEVELOPMENT_FRONT_END];
    if(whitelist.indexOf(req.get('origin')) !== -1){
        next();
    }else{
        res.status(500).json({
            status: 'Error!',
            message: 'Unauthorized access'
        });
    }
}