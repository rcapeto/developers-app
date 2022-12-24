/*
  Warnings:

  - Added the required column `articleId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articlesId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "articleId" TEXT NOT NULL,
    "articlesId" TEXT NOT NULL,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_articlesId_fkey" FOREIGN KEY ("articlesId") REFERENCES "Articles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("id", "likes", "userId") SELECT "id", "likes", "userId" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
