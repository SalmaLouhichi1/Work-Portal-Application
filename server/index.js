import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/Client.js";
import generalRoutes from "./routes/General.js";
import managementRoutes from "./routes/Management.js";
import salesRoutes from "./routes/sales.js";
import adduserRoutes from "./routes/AddUser.js";
import loginRoutes from "./routes/Login.js";
import authenticatedRoutes from "./routes/Authenticated.js";
import receptionsRoutes from "./routes/Receptions.js";
import manufactureRoutes from "./routes/Manufacture.js";
import expeditionRoutes from "./routes/Expedition.js";
import landeringRoutes from "./routes/Landering.js";
import productRoutes from "./routes/Product.js";



/* Data Import */
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat, dataReceptions, dataManufacture, dataExpedition, dataLandering } from "./data/index.js";
import User from "./models/User.js";
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import Receptions from './models/Receptions.js';
import Manufacture from './models/Manufacture.js';
import Expedition from './models/Expedition.js';
import Landering from './models/Landering.js';


/* CONFIGURATION*/ 
dotenv.config();
const app= express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//app.use("/assets", express.static(path.join(__dirname, 'public/assets')));



/*Routes*/
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/user", adduserRoutes);
app.use("/auth", loginRoutes);
app.use("/api", authenticatedRoutes);
app.use("/receptions", receptionsRoutes);
app.use("/manufacture", manufactureRoutes);
app.use("/expedition", expeditionRoutes);
app.use("/landering", landeringRoutes);
app.use("/products", productRoutes);


// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, Express.js!');
  });
  
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /*ONLY ADD DATA ONE TIME */
    //AffiliateStat.insertMany(dataAffiliateStat);
    //OverallStat.insertMany(dataOverallStat);
    //Product.insertMany(dataProduct);
    //ProductStat.insertMany(dataProductStat);
    //Transaction.insertMany(dataTransaction);
    //User.insertMany(dataUser); 
    //Receptions.insertMany(dataReceptions);
    //Manufacture.insertMany(dataManufacture);
    //Expedition.insertMany(dataExpedition);
    //Landering.insertMany(dataLandering);
}).catch((error) => console.log(`${error} did not connect`));