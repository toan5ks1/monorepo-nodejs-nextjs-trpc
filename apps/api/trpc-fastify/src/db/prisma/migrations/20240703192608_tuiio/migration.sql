/*
  Warnings:

  - Changed the type of `type` on the `AuthProvider` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthProviderType" AS ENUM ('GOOGLE', 'CREDENTIALS');

-- AlterTable
ALTER TABLE "AuthProvider" DROP COLUMN "type",
ADD COLUMN     "type" "AuthProviderType" NOT NULL;
