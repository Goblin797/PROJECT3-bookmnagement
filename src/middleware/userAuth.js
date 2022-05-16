const jwt = require('jsonwebtoken')

const tokenValidator = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-key"]
        if (!token) token = req.headers["x-api-key"]


        if (!token) return res.status(403).send({ status: false, message: "Missing authentication token in request" })

        
        let decodedToken = jwt.verify(token, "My private key")
        
        if (!decodedToken) {
            return res.status(403).send({ status: false, message: "Invalid authentication token in request" })
        }

     

        req.userId = decodedToken.userId;
        
        next()
    }
    catch (error) {
        res.status(500).send({status:false, message: error.message})
    }
}


module.exports = { tokenValidator }