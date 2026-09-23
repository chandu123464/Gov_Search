async function test() {
  const res = await fetch('http://localhost:3000/register');
  console.log('Port 3000 status:', res.status);
  const html = await res.text();
  const match = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  if (match) {
    const cssRes = await fetch('http://localhost:3000' + match[1]);
    console.log('Port 3000 CSS status:', cssRes.status, 'Type:', cssRes.headers.get('content-type'), 'Length:', (await cssRes.text()).length);
  } else {
    console.log('No CSS tag found');
  }
}
test();
