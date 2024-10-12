export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://192.168.1.2:27017/api-clean-nodejs',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'XYZ$XPTO'
}