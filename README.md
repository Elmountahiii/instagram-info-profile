# instagram-info-profile

An example Node.js application built using the Express framework connected to instagram private api to get all public users information

# Get started 🥳

Clone this repo :

```bash
 git clone https://github.com/sudoGunner/instagram-info-profile.git ./instagram-info-profile-server
```

### Install npm dependencies after installing

```bash
cd instagram-info-profile-server
npm install
npm updat
```

After install all packages navigate into server.js file 

# Setting up the web server

The server.js file is the main entry point of our application then edit the client variable with your Instagram account login information:

```jsx
const client = new Instagram({
  username: "Your_Email",
  password: "Your_Password",
  cookieStore,
});
```

Then you are good to go .

###
