import app from './app';
import { PORT } from './app/configs';
import connectDB from './app/db/db';

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
