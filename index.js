const http = require('http');
const fs = require('fs/promises');

const hostname = '127.0.0.1';
const port = 3000;

const getFile = async (filename) => {
  try {
    const data = await fs.readFile(filename, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.error(err);
  }
}

const getFilename = (url) => {
  switch (url) {
    case '/contact-me':
      return './contact-me.html';

    case '/':
      return './index.html';

    case '/about':
      return './about.html';

    default:
      return './404.html';
  }
}

const server = http.createServer(async (req, res) => { 
  const filename = getFilename(req.url);
  const content = await getFile(filename);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(content);
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`);
});