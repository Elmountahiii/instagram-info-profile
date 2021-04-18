const express = require("express");
const app = express();
const Instagram = require("instagram-web-api");
const FileCookieStore = require("tough-cookie-filestore2");
const cookieStore = new FileCookieStore("./cookies.json");

var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

const PORT = process.env.PORT || 3000;

app.use(express.json());

const client = new Instagram({
  username: "Your_Email",
  password: "Your_Password",
  cookieStore,
});

app.get("/", (req, res) => {
  res.send("Hello To Your Instagram Server");
});

app.get("/account/:userName", (req, res) => {
  const user_name = req.params.userName;
  (async () => {
    const instagram_user = await client.getUserByUsername({
      username: `${user_name}`,
    });
    res.json(instagram_user);
  })();
});

app.get("/search/:q", (req, res) => {
  const query = req.params.q;
  (async () => {
    const resulte = await client.search({ query: query });

    const data = await JSON.stringify(resulte);
    if (isHTML(String(data))) {
      console.log("must login");
      await client.login();
      const tryagin = await client.search({ query: query });
      res.send(tryagin);
    } else {
      console.log("no  login");

      res.send(resulte);
    }
  })();
});

app.get("/login", (req, res) => {
  (async () => {
    const user = await client.login();
    if (user.authenticated == false) {
      res.status(401).send(user);
    } else {
      res.status(200).send(user);
    }
  })();
});

app.get("/logout", (req, res) => {
  (async () => {
    client.logout();

    res.send({ statu: "Logout" });
    console.log("done");
  })();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
