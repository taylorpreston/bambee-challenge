import "dotenv/config";
import "module-alias/register";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import cors from "cors";
import morgan from "morgan";
// routes
import v1Routes from "./api/v1/v1.routes";
import v2Routes from "./api/v2/v2.routes";

const app = express();
const router: Router = express.Router();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  // send json response
  res.json({ message: "Hello world!" });
});

router.use("/v1", v1Routes);
router.use("/v2", v2Routes);
app.use(router);

export const server = app.listen(process.env.PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:3000 🚀`)
);

export default app;
