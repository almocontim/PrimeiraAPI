const http = require("http");

let usuarios = []; 

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/usuarios") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const usuario = JSON.parse(body);
        usuarios.push(usuario);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Usuário adicionado!" }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Erro no formato dos dados." }));
      }
    });
  } else if (req.method === "GET" && req.url === "/usuarios") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuarios));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Rota não encontrada." }));
  }
});
