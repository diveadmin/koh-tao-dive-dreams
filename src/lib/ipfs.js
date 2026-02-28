import { create } from 'ipfs-http-client';

// Connect to Infura IPFS node (or use your own)
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

export async function uploadBookingToIPFS(bookingData) {
  const { path } = await ipfs.add(JSON.stringify(bookingData));
  return path; // This is the IPFS hash
}
