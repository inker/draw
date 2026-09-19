/**
 * The 32 bytes HMAC-SHA256 signs to, pinned as a width,
 * so a consumer that reads a fixed number of bytes off the front of a digest
 * can say so in its own signature
 */
export type Sha256Digest = ArrayBuffer & {
  byteLength: 32;
};

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
    // Asserted rather than inferred,
    // because crypto.subtle.sign is typed for every algorithm it accepts
    // & so can only promise an ArrayBuffer of some width or other.
    crypto.subtle.sign('HMAC', cryptoKey, data) as Promise<Sha256Digest>;
};
