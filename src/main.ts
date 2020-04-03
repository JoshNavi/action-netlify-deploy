import * as core from '@actions/core'
import NetlifyAPI from 'netlify'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const token = process.env.NETLIFY_AUTH_TOKEN
    const site = process.env.NETLIFY_SITE_ID

    if (!token) {
      core.setFailed('NETLIFY_AUTH_TOKEN must be passed in the env')
      return
    }

    if (!site) {
      core.setFailed('NETLIFY_SITE_ID must be passed in the env')
      return
    }

    const dir = core.getInput('dir', {required: true})
    const message = core.getInput('message', {required: true})
    const isProd = core.getInput('isProd', {required: true}).toLowerCase() === 'true'

    // Create Netlify API client
    const client = new NetlifyAPI(token)

    // Resolve publish directory
    const buildDir = path.resolve(process.cwd(), dir)

    // Deploy to Netlify
    const deploy = await client.deploy(site, buildDir, {
      draft: !isProd,
      message
    })

    core.setOutput('deploy-id', deploy.deployId)
    core.setOutput('deploy-url', deploy.deploy.deploy_ssl_url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
