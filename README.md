# free-time
https://myfreetimeinaweek.in helps its users recognize the amount of time they have in their life for things that they love.


## Setup
Fork this repository and clone your fork on your computer:
```
git clone git@github.com:<your-username>/free-time.git
cd free-time
```

We use Expo to build this React Native application. Hence you need to globally install it on your system.
```
npm install -g expo-cli
yarn install
```

Expo uses `sharp-cli` for optimizing the images and assets of the project.
```
npm install -g sharp-cli
```
Don't worry if this step is unsuccessful in your computer. It is an optional step.

### Test locally
To run the server locally, you can run the following command:
#### Web
```
yarn web
```
It will automatically start a local web server hosted on `http://localhost:19006/`.

### Deploy
```
yarn deploy
```