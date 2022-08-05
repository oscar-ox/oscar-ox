const path = require("path");

const apiPath = path.resolve(__dirname, "apps/api");
const webPath = path.resolve(__dirname, "apps/web");

module.exports = {
    scripts: {
        prepare: {
            default: `nps prepare.api`,
            api: `nps prepare.docker prisma.migrate.dev`,
            docker: "docker-compose up -d",
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
        },
        dev: "npx turbo run dev",
    },
};