const config = {
    PORT: process.env.PORT, // Server PORT is located on an .env file outside of the repository.
    COOKIE_NAME: 'expense-tracker-session',
    DB_URI: `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@taishicluster.klsgn.mongodb.net/?retryWrites=true&w=majority`,
}
module.exports = config;