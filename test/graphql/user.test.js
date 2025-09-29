// test.js
const { spec } = require('pactum');
const { like, eachLike } = require('pactum-matchers');

let token;
beforeEach(async () => {
    token = await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
            mutation AuthUser($email: String, $password: String) {
  authUser(email: $email, password: $password) {
    success
    token

  }
}

  `)
        .withGraphQLVariables({
            "email": "admin@admin.com",
            "password": "admin123"
        })
         .stores('token', 'data.authUser.token')
});

it('listagem de usuarios', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders("Authorization", "$S{token}")
        .withGraphQLQuery(`
   query Users {
  Users {
    id
    email
    profile {
      firstName
    }
  }
}
  `)
       .expectStatus(200) .expectJsonMatch({ data: { Users: eachLike({ id: like("67ad03316f0ec268a020e40e"), email: like("cliente@email.com"), profile: {} }) } });
});
