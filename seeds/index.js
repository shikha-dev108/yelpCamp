
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  // useCreateIndex: true, //NOTE:comment this line coz it is not supported now and due to this nodemon crashed
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    // console.log({ places, descriptors }); //did this because error is coming so console here
    const camp = new Campground({
      //  YOUR USER ID
      author: '6734e35e0cb52b279e19c1ab',
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugiat alias a dolorem perferendis est aspernatur, blanditiis repellat, sit suscipit nam accusamus debitis placeat pariatur quidem enim voluptatum nobis repellendus! Dignissimos.',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/ddtce5qf7/image/upload/v1732285718/YelpCamp/rpvnfz9cr1ihod9evfea.jpg',
          filename: 'YelpCamp/rpvnfz9cr1ihod9evfea',

        },

        {
          url: 'https://res.cloudinary.com/ddtce5qf7/image/upload/v1732285710/YelpCamp/zox7rx89lxhfmnnhqdmf.jpg',
          filename: 'YelpCamp/zox7rx89lxhfmnnhqdmf',

        },
        {
          url: 'https://res.cloudinary.com/ddtce5qf7/image/upload/v1732285712/YelpCamp/ghttlpdmtpsgdrmlcoq2.jpg',
          filename: 'YelpCamp/ghttlpdmtpsgdrmlcoq2',

        }

      ]

    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})