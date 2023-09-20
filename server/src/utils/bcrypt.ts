import * as bcrypt from 'bcrypt';
import constants from '../config/config';
const { SALT } = constants;
export const hash = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, SALT);
    } catch (e) {
        console.log(e)
    }
}
export const compare = async (password: string, encryptedPassword: string) => {
    try {
        return await bcrypt.compare(password, encryptedPassword);
    } catch (e) {
        console.log(e)
    }
}
