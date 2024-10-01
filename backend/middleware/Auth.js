import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ message: 'You are not authenticated', success: false })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Token is invalid'
        })

    }
}

export default authMiddleware;