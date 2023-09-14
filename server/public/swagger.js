module.exports = {
    definition: {
        explorer: true,
        openapi: '3.0.0',
        info: {
            title: 'Growexx Authentication API Docs',
            version: '1.0.0',
            description: 'development environment hostname :  api.growexx.com'
        },
        servers: [
            {
                url: process.env.BASE_URL,
                description: `${process.env.NODE_ENV} server`
            }
        ]
    },
    apis: ['./server/services/*.swagger.js', './server/services/**/*.swagger.js']
};
