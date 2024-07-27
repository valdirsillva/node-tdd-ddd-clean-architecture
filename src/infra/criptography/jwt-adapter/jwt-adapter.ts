import jwt from 'jsonwebtoken'
import { Encrypter } from "../../../data/protocols/criptography/encrypter";
import { Decrypter } from '../../../data/protocols/criptography/decrypter';

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) { }

    async encrypt(value: string): Promise<string> {
        const acessToken = await jwt.sign({ id: value }, this.secret)
        return acessToken
    }

    async decrypt(value: string): Promise<string> {
        await jwt.verify(value, this.secret)
        return null
    }
}