import jwt, { JwtPayload } from 'jsonwebtoken'

const jwtProvider = () => {
    const sign = (payload: object) => {
      return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
    };

    const verify = (token:string, callback: (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => void) => {
        return jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
           callback(err, decoded);
        })
    }

    return{ sign, verify }
};

export default jwtProvider;