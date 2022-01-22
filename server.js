const fastify = require("fastify")({logger: true});
const path = require("path");

fastify.register(require("fastify-static"), {
	root: path.join(__dirname, "dist"),
});

fastify.register(require("fastify-env"), {
	dotenv: true,
	schema: {
		type: "object",
		required: ["TWITTER_API_KEY"],
		properties: {
			TWITTER_API_KEY: {
				type: "string",
			},
		},
	},
});

fastify.register(require("fastify-http-proxy"), {
	prefix: "/api",
	preHandler: function(request, reply, next) {
		request.headers.Authorization = `Bearer ${fastify.config.TWITTER_API_KEY}`;
		next();
	},
	upstream: "https://api.twitter.com/1.1",
});

fastify.listen(3000);
