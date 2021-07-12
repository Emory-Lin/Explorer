const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const images_collection = [
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/46/35/bb/shutterstock-722654752.jpg',
        filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/51/c6/d1/shutterstock-558006505.jpg',
        filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/7c/2f/ef/shutterstock-522872887.jpg',
        filename: ''
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/04/81/5a/shutterstock-372187969.jpg',
        filename: ''
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/7d/76/33/shutterstock-1171752994.jpg',
        filename: ''
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/71/ea/52/shutterstock-219132490.jpg',
        filename: ''
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/e5/ae/6b/shutterstock-279310514.jpg',
        filename: ''
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/ab/8d/9e/shutterstock-571988035.jpg',
        filename: ''
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/a2/10/64/shutterstock-89718916.jpg',
        filename: ''
    },
    {
        url: 'https://www.worldatlas.com/r/w960-q80/upload/0c/e6/88/shutterstock-197867861.jpg',
        filename: ''
    }   
]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '60bf92916a81749f99d88aed',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [images_collection[i]]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})