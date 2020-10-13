![build-test](https://github.com/JoshNavi/action-netlify-deploy/workflows/build-test/badge.svg)

# Deploy to Netlify with this Github Action

## Usage

```yaml
name: Deploy to Netlify

on:
  push:
    branches:
      - main

env:
  NETLIFY_SITE_ID: <YOUR_NETLIFY_SIDE_ID>

jobs:
  deploy: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # Run something here that will build your app 

      - uses: JoshNavi/action-netlify-deploy@v2.1.0
        id: deploy # put this here so we can access the output later
        with:
          dir: build # The folder with your built app
          message: ${{ format('Deploy Preview for {0}', github.sha) }}
          isProd: ${{ true }} # Some expression here so you don't accidentally always deploy to prod
        env:
          NETLIFY_SITE_ID: ${{ env.NETLIFY_SITE_ID }} # This one doesn't need to be a secret
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }} # This one definitely does

      - name: View Output # Or run tests or something
        run: echo "$STEP_CONTEXT"
        env:
          STEP_CONTEXT: ${{ toJson(steps.deploy.outputs) }}
```
