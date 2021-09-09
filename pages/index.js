import Head from 'next/head';
import { useState } from 'react';

export default function Hello() {
  const [status, setStatus] = useState('Click submit to send the message!');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('Sending...');

    const form = e.target;
    const formData = {
      name: form[0].value,
      email: form[1].value,
      message: form[2].value,
      passphrase: form[3].value,
    };

    let postResponse = await fetch('/api/mail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    postResponse = await postResponse.json();
    setStatus(postResponse.message);
  };
  return (
    <>
      <Head>
        <meta name="description" content="A simple contact me page" />
        <title>Contact Me</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" required />
        </label>
        <label>
          Email
          <input type="email" required />
        </label>
        <label>
          Message
          <textarea name="message" cols="30" rows="8" required></textarea>
        </label>
        <label className="pass">
          Passphrase
          <input type="text" className="pass" required />
        </label>
        <div role="alert">{status}</div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
