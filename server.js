"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const getBotMessage = (text) => {
  const commonGreetings = ["hi", "hello", "howdy"];
  const commonGoodbyes = ["goodbye", "bye", "see you", "ciao"];
  const textToLowerCase = text.toLowerCase();
  const jokes = [
    `What’s the best thing about Switzerland? I don’t know, but the flag is a big plus.`,
    `I invented a new word: Plagiarism!`,
    `A woman in labour suddenly shouted, “Shouldn’t! Wouldn’t! Couldn’t! Didn’t! Can’t!” The doctor replied: "Don’t worry! Those are just contractions.”`,
    `Did you hear about the actor who fell through the floorboards? He was just going through a stage.`,
    `Did you hear about the claustrophobic astronaut? He just needed a little space.`,
  ];
  let botMsg = "";
  if (commonGreetings.includes(text.toLowerCase())) {
    botMsg = `Bzzt Hello.`;
  } else if (commonGoodbyes.includes(text.toLowerCase())) {
    botMsg = `Bzzt Goodbye.`;
  } else if (textToLowerCase === "something funny") {
    return "Do you want to hear a joke?";
  } else if (textToLowerCase === "yes") {
    botMsg = jokes[Math.floor(Math.random() * 4)];
  } else if (textToLowerCase === "no") {
    botMsg =
      "Bzzt Funny you don't like jokes because your life is a joke. Bot 1, User 0. Game over.";
  } else {
    botMsg = `Bzzt ${text}.`;
  }
  return botMsg;
};

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messageOptions = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const messageChosen = messageOptions[Math.floor(Math.random() * 6)];
    const message = { author: "monkey", text: messageChosen };
    const randomTime = Math.floor(Math.random() * 1500);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    const messageContent = req.query.text;
    const message = { author: "parrot", text: messageContent };
    const randomTime = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const messageContent = getBotMessage(req.query.text);
    const message = { author: "bot", text: messageContent };
    const randomTime = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
