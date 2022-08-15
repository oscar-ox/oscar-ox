
const path = require("path");

const apiPath = path.resolve(__dirname, "apps/api");
const webPath = path.resolve(__dirname, "apps/web");

const ciApiPath = path.resolve(__dirname, "out/apps/api");
const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
    scripts: {
        prepare: {
            default: `nps prepare.api`,
            api: `nps prepare.docker prisma.migrate.dev`,
            docker: "docker-compose up -d",
            ci: {
                web: `npm ci -w web`,
                api: `npm ci -w api && nps prisma.generate`,
            },
        },
        prisma: {
            generate: `cd ${apiPath} && npx prisma generate`,
            studio: `cd ${apiPath} && npx prisma studio`,
            migrate: {
                dev: `cd ${apiPath} && npx prisma migrate dev --skip-seed`,
            },
        },
        build: {
            default: "npx turbo run build",
            ci: {
                web: `cd ${webPath} && npm run build`,
                api: `cd ${apiPath} && npm run build`,
            },
        },
        dev: "npx turbo run dev",
    },
};