-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'INSTRUCTOR');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255),
    "middleInitial" VARCHAR(255),
    "lastName" VARCHAR(255),
    "role" "Role" NOT NULL DEFAULT 'INSTRUCTOR',
    "email" VARCHAR(255) NOT NULL,
    "instructorCode" CHAR(4) NOT NULL,
    "department" VARCHAR(255),
    "departmentId" VARCHAR(255),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL,
    "courseCode" VARCHAR(25) NOT NULL,
    "languageCode" CHAR(2) NOT NULL,
    "instructorCode" UUID NOT NULL,
    "dotclm" CHAR(6) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "endDate" TIMESTAMPTZ NOT NULL,
    "learners" INTEGER NOT NULL,
    "learnersCompleted" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DOTCLM" (
    "id" UUID NOT NULL,
    "dotId" UUID NOT NULL,
    "languageCode" CHAR(2) NOT NULL,
    "content" JSONB NOT NULL,
    "learners" INTEGER NOT NULL,
    "learnersCompleted" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "versionDate" TIMESTAMPTZ NOT NULL,
    "previousVersion" UUID,
    "nextVersion" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "DOTCLM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DOT" (
    "id" UUID NOT NULL,
    "dot" CHAR(6) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "DOT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ILM" (
    "id" UUID NOT NULL,
    "content" JSONB NOT NULL,
    "version" INTEGER NOT NULL,
    "versionDate" TIMESTAMPTZ NOT NULL,
    "previousVersion" UUID,
    "nextVersion" UUID,
    "languageCode" CHAR(2) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ILM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Glossary" (
    "id" UUID NOT NULL,
    "content" JSONB NOT NULL,
    "dotId" UUID NOT NULL,
    "languageCode" CHAR(2) NOT NULL,
    "version" INTEGER NOT NULL,
    "versionDate" TIMESTAMPTZ NOT NULL,
    "previousVersion" UUID,
    "nextVersion" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Glossary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "code" CHAR(2) NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" UUID NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_instructorCode_key" ON "User"("instructorCode");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorCode_fkey" FOREIGN KEY ("instructorCode") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DOTCLM" ADD CONSTRAINT "DOTCLM_dotId_fkey" FOREIGN KEY ("dotId") REFERENCES "DOT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DOTCLM" ADD CONSTRAINT "DOTCLM_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ILM" ADD CONSTRAINT "ILM_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Glossary" ADD CONSTRAINT "Glossary_dotId_fkey" FOREIGN KEY ("dotId") REFERENCES "DOT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Glossary" ADD CONSTRAINT "Glossary_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
