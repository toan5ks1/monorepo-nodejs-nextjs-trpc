-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(191) NOT NULL,
    "description" TEXT,
    "images" JSONB,
    "slug" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);
