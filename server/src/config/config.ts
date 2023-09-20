import 'dotenv/config';
const config = {
    SALT: parseInt(process.env.SALT),
    JWT_SECRET: process.env.JWT_SECRET,
    PG_PASSWORD: process.env.PG_PASSWORD
}
export default config;