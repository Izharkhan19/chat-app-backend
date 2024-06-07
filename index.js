// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { Server } = require("socket.io");

// const app = express();

// // app.use(
// //   bodyParser.urlencoded({
// //     extended: true,
// //   })
// // );
// // app.use(bodyParser.json());

// // app.use(express.json());
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     // origin: "http://localhost:3000",
//     origin: "https://chat-app-frontend-three-alpha.vercel.app",
//     methods: ["GET", "POST"],
//   },
// });

// //#region To set up new file

// // const mongoose = require("mongoose");
// // const chatSave = require("./Controller/chatController");
// // const chatRouter = require("./Routes/chatRoute");

// // // Configuring the database
// // const url =
// //   "mongodb+srv://bt23052001:vNI8kXQjM3jeLAS9@cluster0.hfby3.mongodb.net/My_Chats?retryWrites=true&w=majority";

// // mongoose.Promise = global.Promise;

// // // Connecting to the database
// // mongoose
// //   .connect(url, {
// //     useNewUrlParser: true,
// //   })
// //   .then(() => {
// //     console.log("Successfully connected to the database");
// //   })
// //   .catch((err) => {
// //     console.log("Could not connect to the database. Exiting now...", err);
// //     process.exit();
// //   });

// //#endregion

// io.on("connection", (socket) => {
//   socket.on("join_room", (data) => {
//     socket.join(data);
//     // console.log(`User with ID : ${socket.id} joined room : ${data}`);
//   });

//   socket.on("send_message", async (data) => {
//     // Save the chats in DB :
//     // console.log("first", data);
//     // await chatSave();
//     socket.to(data.room).emit("recieve_message", data);
//   });
// });

// // app.use("/myChat", chatRouter);

// app.get("/", (req, res) => {
//   res.send("Welcom to my API's");
// });

// const PORT = 3001;
// // const PORT = "https://chat-app-frontend-three-alpha.vercel.app";
// // const PORT = "https://chat-backend-f083.onrender.com";

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// --------------------------------------------------------------------------------
const cors = require("cors")
const express = require("express")

const stripe = express("stripe")("sk_test_51OoQQiSDMvvYMBnMA7nLzyEiUiQP8f7VWbjR9VPNrqH64TaVoHmWx6OMgcoqAOpMUx6j0MamPOlfF5AIpOkSUs1n00Sq1qncmk")
const uuid = express("uuid/v4")

const app = express()

// middlewares :
app.use(express.json())
app.use(cors())

// routes :
app.get("/", (req, res) => {
    res.send("It is working")
})

app.post("/payment", (req, res) => {
    const { product, token } = req.body
    console.log("PRODUCT", product)
    console.log("PRODUCT PRICE", product.price)
    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create(
            {
                amount: product.price * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: product.name,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country,
                    }
                },
            },
            { idempotencyKey })
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => console.log(err))


})


// listen :
app.listen(8282, () => {
    console.log("Listen on port 8080")
})
