// seed.js
require("dotenv").config();
const mongoose = require('mongoose');
const Game = require('./models/game');
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// Define the game data
const games = [
  {
    title: 'Portal 2',
    description: 'A puzzle-platformer game developed by Valve.',
    releaseDate: new Date('2011-04-18'),
    genre: 'Puzzle-platformer',
    url: "https://cdn2.steamgriddb.com/hero/dbab2adc8f9d078009ee3fa810bea142.png",
    urlCover: "https://cdn2.steamgriddb.com/grid/9ebc0e97da8e0e5083fea7203f194d2b.png",
    comments: [],
  },
  {
    title: 'It Takes Two',
    description: 'A cooperative action-adventure game developed by Hazelight Studios.',
    releaseDate: new Date('2021-03-26'),
    genre: 'Action-adventure',
    url: "https://cdn2.steamgriddb.com/hero/1b5a5a165128b8eaaf1440224f3edde7.png",
    urlCover: "https://cdn2.steamgriddb.com/grid/84d8df6932e202152767f7579f32c613.png",
    comments: [],
  },
  {
    title: 'Elden Ring',
    description: 'An action RPG developed by FromSoftware.',
    releaseDate: new Date('2022-02-25'),
    genre: 'Action RPG',
    url: "https://cdn2.steamgriddb.com/hero/5b359e020d0c4726dd6876f6e6500648.png",
    urlCover: "https://cdn2.steamgriddb.com/grid/a0abf0396a718b8982fce0b80181d8cb.png",
    comments: [],
  },
  {
    title: 'Chained Together',
    description: 'An indie puzzle-platformer game.',
    releaseDate: new Date('2023-01-15'),
    genre: 'Puzzle-platformer',
    url: "https://cdn2.steamgriddb.com/hero/f341ad082c0761d21aa3b7ed8cd268a9.png",
    urlCover: "https://cdn2.steamgriddb.com/grid/2a0c42d296cf1c678179d4731694e667.png",
    comments: [],
  },
  {
    title: 'Wobbly Life',
    description: 'A multiplayer open-world game where players can explore and complete various activities.',
    releaseDate: new Date('2020-07-09'),
    genre: 'Open-world',
    url: "https://cdn2.steamgriddb.com/hero_thumb/2cb8fad3edc28e6f8cc7f72e92fc8142.jpg",
    urlCover: "https://cdn2.steamgriddb.com/grid/dec47d14501a56581864f100d5571632.png",
    comments: [],
  }
];

// Seed the data
const seedDB = async () => {
  try {
    await Game.deleteMany({}); // Clear existing games
    await Game.insertMany(games); // Insert new games
    console.log('Games seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

// Run the seeder
seedDB();