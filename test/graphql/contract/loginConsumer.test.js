const { reporter, flow, handler } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
    pf.config.url = 'http://localhost:8081';
    pf.config.projectId = 'lojaebac-front';
    pf.config.projectName = 'Loja EBAC Front';
    pf.config.version = '1.0.0';
    pf.config.username = 'scanner';
    pf.config.password = 'scanner';
    reporter.add(pf.reporter);
}


before(async () => {
    addFlowReporter();
});


after(async () => {
    await reporter.end();
});

handler.addInteractionHandler('Login Response', () => {
    return {
        provider: 'lojaebac-api',
        flow: 'Login',
        request: {
            method: 'POST',
            path: '/public/authUser',
            body: {
                "email": "admin@admin.com",
                "password": "admin123"
            },
            response: {
                status: 200,
                body: {
                    "success": true,
                    "message": "login successfully",
                    "data": {
                        "_id": "679f50eb0cf0a913258b286c",
                        "role": "admin",
                        "profile": {
                            "firstName": "admin"
                        },
                        "email": "admin@admin.com",
                        "token":  like ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OWY1MGViMGNmMGE5MTMyNThiMjg2YyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTc1OTI3MTg2NSwiZXhwIjoxNzU5MzU4MjY1fQ.0Db-lOjUV1qgsYjdoUvz70wsdIhNBCWyrHWKkNuhtQ0")
                    }
                }
            }
        }
    }
})

it('FRONT - deve autenticar o usuario corretamente', async () => {
    await flow("Login")
        .useInteraction('Login Response')
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .expectStatus(200)
        .expectJson('success', true)
});


