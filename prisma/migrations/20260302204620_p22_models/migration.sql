-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "difficultyLevel" TEXT NOT NULL DEFAULT '2',
    "description" VARCHAR(2500) NOT NULL DEFAULT '',
    "input" VARCHAR(2500) NOT NULL DEFAULT '',
    "output" VARCHAR(2500) NOT NULL DEFAULT '',
    "moduleVideo" TEXT NOT NULL DEFAULT '',
    "moduleIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "shortDescription" TEXT NOT NULL DEFAULT '',
    "longDescription" VARCHAR(2500) NOT NULL DEFAULT '',
    "difficultyLevel" TEXT NOT NULL DEFAULT '2',
    "module" TEXT,
    "activities" TEXT[],
    "duration" INTEGER NOT NULL,
    "sprintNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" VARCHAR(500) NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SprintToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SprintToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_name_key" ON "Sprint"("name");

-- CreateIndex
CREATE INDEX "Sprint_module_idx" ON "Sprint"("module");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE INDEX "_SprintToTechnology_B_index" ON "_SprintToTechnology"("B");

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_module_fkey" FOREIGN KEY ("module") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SprintToTechnology" ADD CONSTRAINT "_SprintToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Sprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SprintToTechnology" ADD CONSTRAINT "_SprintToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
