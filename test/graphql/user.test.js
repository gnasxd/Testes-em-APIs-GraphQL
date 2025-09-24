// test.js
const { spec } = require('pactum');
const {like, eachLike} = require ('pactum-matchers');

it('listagem de usuarios', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
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
        .expectStatus(200)
         .expectJsonMatch({
            data: {
                Users: eachLike({
                    id: like ("67ad03316f0ec268a020e40e"),
                    email: like ("cliente@email.com"),
                    profile: {
                      firstName: like("Cliente")
                    }


                })
            } 
  });
});