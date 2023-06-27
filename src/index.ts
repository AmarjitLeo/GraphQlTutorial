import express from 'express';
import { Server } from './helper/server';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { connectToGraphQl } from './helper/graphQl'

dotenv.config();
const Port = process.env.PORT;
const server = new Server(Number(Port));
server.start();

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

connectToGraphQl(server.getApp())