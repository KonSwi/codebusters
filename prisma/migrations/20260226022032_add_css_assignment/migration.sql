-- CreateEnum
CREATE TYPE "CssCategory" AS ENUM ('SHAPES');

-- CreateTable
CREATE TABLE "CssAssignment" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" "CssCategory" NOT NULL,
    "difficultyLevel" "DifficultyLevel" NOT NULL,
    "requirements" INTEGER NOT NULL,
    "colors" TEXT[],
    "targetUrl" TEXT NOT NULL,

    CONSTRAINT "CssAssignment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "CssAssignmentSolution" (
    "_id" TEXT NOT NULL,
    "CssAssignmentId" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "result" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CssAssignmentSolution_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CssAssignmentSolution_CssAssignmentId_userId_key" ON "CssAssignmentSolution"("CssAssignmentId", "userId");

-- AddForeignKey
ALTER TABLE "CssAssignmentSolution" ADD CONSTRAINT "CssAssignmentSolution_CssAssignmentId_fkey" FOREIGN KEY ("CssAssignmentId") REFERENCES "CssAssignment"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CssAssignmentSolution" ADD CONSTRAINT "CssAssignmentSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
