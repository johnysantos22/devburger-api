import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

function authMiddleware(request, response, next) {
    const authtoken = request.headers.authorization;


    if (!authtoken) {
        return response.status(401).json({
            error: 'No token provided.'
        });
    }


    const token = authtoken.split(' ').at(1);

    try {

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return response.status(401).json({ error: 'Token is invalid' });
            }


            request.userId = decoded.id;
           request.userName = decoded.name;
        });
    } catch (err) {

        return response.status(401).json({ error: 'Token is invalid' });
    }

    return next();
}

export default authMiddleware;
