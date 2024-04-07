import * as jwt from 'jsonwebtoken';

export function generateJwtToken(id: string, role: string, secretKey: string): string {
  const token = jwt.sign({ id, role }, secretKey, { expiresIn: process.env.JWT_EXPIRES_AT });
  return token;
}

export async function verifyJWT (token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, payLoad) => {
        if (err) reject(err);
  
        resolve(payLoad);
      });
    });
};


