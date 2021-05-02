async function retrieveLicense(key) {
  try {
    const license = await fetch(`https://api.metalabs.io/v4/licenses/${key}`, {
      headers: {
        'Authorization': 'Bearer API_KEY'
      }
    }).then(res => res.json());
  } catch {
    throw new Error('License not found')
  }
}