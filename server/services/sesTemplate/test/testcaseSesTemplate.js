module.exports = {
    retrievingTemplate: [
        {
            it: 'As a user, I should check template name in request.',
            options: {},
            status: 0
        },
        {
            it: 'As a user I should check valid template name',
            options: {
                templateName: 'myFile'
            },
            status: 0
        }
    ],
    updateTemplate: [
        {
            it: 'As a user, I should check template name in request.',
            options: {},
            status: 0
        },
        {
            it: 'As a user I should check valid template name',
            options: {
                templateName: 'myFile'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if subject is not pass',
            options: {
                templateName: 'myFile'
            },
            status: 0
        }
    ],
    createTemplate: [
        {
            it: 'As a user I should check valid template name',
            options: {
                templateName: 'myFile'
            },
            status: 0
        },
        {
            it: 'As a user, I should check template name in request.',
            options: {
                subject: 'my trial'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if templateName is not pass',
            options: {
                templateName: '*',
                subject: 'my trial'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if subject is not pass',
            options: {
                templateName: 'myFile',
                subject: '*'
            },
            status: 0

        },
        {
            it: 'As a user I should check valid suject name',
            options: {
                subject: 'my trial'
            },
            status: 0
        }
    ],
    deleteTemplate: [
        {
            it: 'As a user, I should check template name in request.',
            options: {},
            status: 0
        },
        {
            it: 'As a user I should check valid template name',
            options: {
                templateName: '*'
            },
            status: 0
        }
    ]
};
