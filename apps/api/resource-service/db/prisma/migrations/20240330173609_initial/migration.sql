/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Credentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_uid_fkey";

-- DropForeignKey
ALTER TABLE "AuthProvider" DROP CONSTRAINT "AuthProvider_uid_fkey";

-- DropForeignKey
ALTER TABLE "Credentials" DROP CONSTRAINT "Credentials_uid_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_uid_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "AuthProvider";

-- DropTable
DROP TABLE "Credentials";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "PasswordResetToken";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- DropEnum
DROP TYPE "AuthProviderType";
