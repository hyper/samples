async function updateLicense(key, hwid) {
  await fetch(`https://api.metalabs.io/v4/licenses/${key}`, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer API_KEY',
      'Content-Type': 'application/json'
    },
    body: {
      metadata: { hwid }
    }
  })
}