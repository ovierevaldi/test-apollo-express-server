import jwt, { JwtPayload } from 'jsonwebtoken'

type userPayload = {
  id: string
  username: string
  roles: string[]
}

const jwtProvider = () => {
    const sign = (payload: object) => {
      if(process.env.JWT_SECRET)
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
    };

    const verify = (token:string, callback: (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => void) => {
        if(process.env.JWT_SECRET){
          return jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            callback(err, decoded);
         })
        }
    };

    const signUser = (payload: userPayload) => {
      return sign(payload);
    };

    const verifyUser = (token: string): Promise<userPayload | null> => {
      return new Promise((resolve) => {
        verify(token, (err, decoded) => {
          if(decoded){
            resolve(decoded as userPayload);
          }
          else
            resolve(null);
        })
      })
    }

    return{ signUser, verifyUser }
};

export default jwtProvider;