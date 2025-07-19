import { NotarizationClient, LockedNotarization } from 'iota_notarization';

export async function notarizeAttendance(data: Uint8Array): Promise<string> {
  const client = await NotarizationClient.new("https://api.iota.org");

  const notarization = new LockedNotarization()
    .withData(data)
    .withTimeLock(365 * 24 * 3600); // 1 year

  return await client.submit(notarization);
}
