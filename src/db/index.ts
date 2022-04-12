import { logDanger, logPrimary } from '../utils';
import mongoose from 'mongoose';

export async function initDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});

    logPrimary('DB connected...');
  } catch (err) {
    logDanger(err.message);
    // exit process
    process.exit(1);
  }
}
