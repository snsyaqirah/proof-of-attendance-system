import { IotaIdentityClient } from '@iota/identity-wasm';

export async function createAttendeeIdentity(eventDid: string, attendeeDid: string, issuerDocument: any) {
  const client = new IotaIdentityClient("https://api.iota.org");
  const did = await client.createDid();

  const credential = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiableCredential", "AttendanceCredential"],
    "issuer": eventDid,
    "credentialSubject": {
      "id": attendeeDid,
      "eventName": "IOTA Summit 2025",
      "attendanceVerified": true
    }
  };

  return await issuerDocument.createCredentialJwt(credential);
}
