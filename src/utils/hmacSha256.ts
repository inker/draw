export default async (key: BufferSource) => {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    false,
    ['sign'],
  );
  return (data: BufferSource) => crypto.subtle.sign('HMAC', cryptoKey, data);
};
