// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import { Router } from '@layer0/core/router'
import { nextRoutes } from '@layer0/next'

const router = new Router();
export default (
    process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD
        ? router
            .requireBasicAuth({
                username: process.env.BASIC_AUTH_USERNAME,
                password: process.env.BASIC_AUTH_PASSWORD,
            })
        : router
)
    .match('/service-worker.js', ({ serviceWorker }) => {
        return serviceWorker('.next/static/service-worker.js')
    })
    .use(nextRoutes) // automatically adds routes for all files under /pages
