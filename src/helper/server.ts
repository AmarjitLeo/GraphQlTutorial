import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from "compression";
import cors from 'cors';
import routes from "../routes/index";

dotenv.config();
export class Server {
  private app: Application;
  private port: number;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.configureRoutes();
    this.configureMiddleWare();
  }

  private configureRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send("Basic Crud Application!")
    })
  }

  private configureMiddleWare(): void {
    this.app.use(cors({
      credentials: true
    }))
    this.app.use(compression())
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
   routes(this.app)
  }

  public addMiddleware(middleware: any): void {
    this.app.use(middleware)
  }

  public getApp(): any {
    return this.app
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

