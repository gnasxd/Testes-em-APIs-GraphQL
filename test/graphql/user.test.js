// test.js
const { spec } = require('pactum');
const {eachlike, like} = require ('pactum-matchers');

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
                Users: eachlike({
                    id: like ("67a0ca120cf0a913258b28d3"),
                    email: like ("arthursilvamirandanobre@gmail.co"),
                    profile: {
                        firstName: like("arthur")
                    }


                })
            } 
  });
});