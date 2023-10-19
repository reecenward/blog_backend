#Blog back end

#What i have:
- Authentication with ( bcrypt, passport js )
- Protected & normal routes talking to MySQL DB and S3 bucket
- Prisma on top of MySQL for simple queries and schema's
- Basic production configuration
- Rate limitng on login attempts

#Current Tech stack:
- Node JS
- Express JS
- My SQL (hosted on planetscale)
- Prisma
- Hosted on Railway

#What i want to add:
- Server side rendering
- Authentication for adding images to S3 ( i forgot to add )
- Add more rules to the prisma schema for more security
- Better data validation
- design it for headless cms use
- make it into a npm thing for packaging or distribution for others to use

#Problems i need to fix:
- Error messages and logging
- Better encryption with argon2id for hashing passwords
- 2 fac authentication
- better rate limiting
- image problem with saving the blog posts and having the img url expiring (maybe server side rendering could make this a nice fix) or just checking if its expired and getting a new one when someone request the post
- Authentication for image upoading
