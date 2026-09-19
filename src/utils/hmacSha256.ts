export default async (key: Parameters<typeof crypto.subtle.importKey>[1]) => {
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
  return (data: Parameters<typeof crypto.subtle.sign>[2]) =>
    crypto.subtle.sign('HMAC', cryptoKey, data);
};
