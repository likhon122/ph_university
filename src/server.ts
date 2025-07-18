import app from './app';
import { PORT } from './app/configs';
import connectDB from './app/db/db';
import { Server } from 'http';

let server: Server;

async function main() {
  await connectDB();
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();

process.on('unhandledRejection', () => {
  console.log('👿 Shutting down the server due to Unhandled Promise Rejection');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.log('👿 Shutting down the server due to Uncaught Exception');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
