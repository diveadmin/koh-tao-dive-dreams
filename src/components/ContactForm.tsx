import { useState } from 'react';
import { uploadBookingToIPFS } from '../lib/ipfs';

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const hash = await uploadBookingToIPFS(bookingData);
      setIpfsHash(hash);
      setResult("Success! Data stored on IPFS.");
    } catch (err) {
      setResult("Error uploading to IPFS.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <textarea name="message" required></textarea>
      <button type="submit">Submit</button>
      <p>{result}</p>
      {ipfsHash && (
        <p>
          IPFS Hash: <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">{ipfsHash}</a>
        </p>
      )}
    </form>
  );
}
