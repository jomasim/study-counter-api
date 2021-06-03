const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')
const client = new SecretManagerServiceClient()

export async function getSecret (key, version = 'latest') {
  // Access the secret.
  const [accessResponse] = await client.accessSecretVersion({
    name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secret}/versions/${version}`
  })

  return accessResponse.payload.data.toString('utf8')
}
