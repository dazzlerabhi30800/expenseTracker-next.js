import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    // url: process.env.NEXT_PUBLIC_DATABASE_URL,
    url: "postgresql://shorts_owner:WMtc9yzga6fK@ep-proud-river-a1rxqwfn.ap-southeast-1.aws.neon.tech/expense-tracker?sslmode=require",
  },
});
