// src/components/AttendanceScanner.tsx
import React from 'react';
import { Transaction, useSignAndExecuteTransaction } from '@iota/dapp-kit';
import QrScanner from 'qr-scanner';

interface Props {
  packageId: string;
  eventId: string;
}

export default function AttendanceScanner({ packageId, eventId }: Props) {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const scanNFC = async () => {
    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.addEventListener('reading', async ({ message, serialNumber }) => {
        const verificationCode = message.records[0].data; // customize if needed
        await mintBadge(verificationCode.toString(), serialNumber);
      });
    } else {
      alert('NFC not supported on this browser/device.');
    }
  };

  const scanQR = () => {
    const qrScanner = new QrScanner(
      document.getElementById('video-element') as HTMLVideoElement,
      async (result) => {
        await mintBadge(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
      }
    );
    qrScanner.start();
  };

  const mintBadge = async (verificationCode: string, nfcId: string | null = null) => {
    const transaction = new Transaction();

    transaction.moveCall({
      target: `${packageId}::proof_of_attendance::mint_attendance_badge`,
      arguments: [
        transaction.object(eventId),
        transaction.pure(verificationCode),
        transaction.pure(JSON.stringify({ nfcId, timestamp: Date.now() })),
        transaction.object('0x6'), // example clock object
      ],
    });

    signAndExecute(
      { transaction },
      {
        onSuccess: (res) => {
          console.log('Mint success:', res);
          alert('Attendance badge minted!');
        },
        onError: (err) => {
          console.error('Mint failed:', err);
          alert('Error: ' + err.message);
        },
      }
    );
  };

  return (
    <div>
      <button onClick={scanNFC}>Scan NFC</button>
      <button onClick={scanQR}>Scan QR</button>
      <video id="video-element" style={{ display: 'none' }} />
    </div>
  );
}
