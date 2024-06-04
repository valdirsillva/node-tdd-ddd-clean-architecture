export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/api-clean-nodejs',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'XYZ$XPTO'
}