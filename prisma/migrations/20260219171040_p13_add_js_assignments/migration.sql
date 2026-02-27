/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FUNCTION', 'LOOP');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "nick" TEXT,
    "name" TEXT,
    "lastName" TEXT,
    "password" TEXT,
    "email" TEXT,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "acceptTerms" BOOLEAN,
    "eneabled" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "JavascriptAssignment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'FUNCTION',
    "difficultyLevel" "DifficultyLevel" NOT NULL DEFAULT 'EASY',
    "submissions" INTEGER DEFAULT 0,
    "descriptionStart" TEXT NOT NULL,
    "descriptionEnd" TEXT,
    "sampleInput" TEXT[],
    "sampleOutput" TEXT[],
    "tests" JSONB[],
    "patternFunction" TEXT NOT NULL,

    CONSTRAINT "JavascriptAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JavascriptAssignmentSolution" (
    "id" TEXT NOT NULL,
    "javascriptAssignmentId" TEXT NOT NULL,
    "solution" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "JavascriptAssignmentSolution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "JavascriptAssignmentSolution_javascriptAssignmentId_userId_key" ON "JavascriptAssignmentSolution"("javascriptAssignmentId", "userId");

-- AddForeignKey
ALTER TABLE "JavascriptAssignmentSolution" ADD CONSTRAINT "JavascriptAssignmentSolution_javascriptAssignmentId_fkey" FOREIGN KEY ("javascriptAssignmentId") REFERENCES "JavascriptAssignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JavascriptAssignmentSolution" ADD CONSTRAINT "JavascriptAssignmentSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
