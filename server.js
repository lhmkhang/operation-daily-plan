import express from "express";
import next from "next";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

nextApp.prepare().then(() => {
    const app = express();
    app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
    // Static files
    // app.use('/_next', express.static(path.join(__dirname, 'public')));

    // All other requests

    app.get('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

