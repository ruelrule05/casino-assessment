# Casino Assessment

The task is to create a simple page using Vue.js which acts as a page of available games for a casino website. A design will be provided and must be used to create a seamless responsive web page. The output of the task is not intended to be a complete finished product, but it will be assessed as an initial prototype. The code behind it though should be as close to production quality code as can be achieved in the time available.
A list of the games will be provided as a feed to be used by the page. A small number of the games will be jackpot games which means a jackpot will be gradually increasing based on betting activity until the jackpot is won. An additional feed is provided to get the current jackpot value for such games.
Styled components should be used without any css framework.


## Project Setup

### Create the environment variable

```sh
touch .env
```

### Update the environment variables

```
VITE_GAME_LIST_URI="https://stage.whgstage.com/front-end-test/games.php"
VITE_JACKPOT_URI="https://stage.whgstage.com/front-end-test/jackpots.php"
```

### Install Dependencies


```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Tests
```sh
npm run test
```