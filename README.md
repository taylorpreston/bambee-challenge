### I hope you enjoy the madness!

# Stack

- prisma
- express
- supertest
- jwt

# Set up

- DB setup `npx prisma migrate && npx prisma db seed`
- To run the api you can run `npm run dev`
- To run the tests `npm run test`

# Things I like that I did

- I think I like the way I structured this project. It is a bit of a new way for me to structure things, but makes sense for versioning and simplicity.
- I like the validation middleware. I think that was a pretty decent choice.
- I think I did a good job of just keeping it simple

# Things I ran in to issues with

- had some weirdness setting up the token piece of the test but figured it out after a bit. beforeAll for the win!
- I went back and forth a bit on whether to use passport js or not
- I attempted to extend the express request type to include the `userId` from the authorization middleware but think I didn't have TS configured correctly and didn't want to spend too much time tinkering with that. I'm not a TS superhero yet.

# Things I wish I had some more time for

- I wish I had added some better error messaging in
- I think I should have started with docker and psql instead of just using sqlite for simplicity
- I wanted to get to the refresh token piece but ran out of time for that.
