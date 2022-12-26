-- AlterTable
ALTER TABLE "Publications" ADD COLUMN "editAt" DATETIME;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "editAt" DATETIME,
    "text" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    CONSTRAINT "Comments_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("createdAt", "developerId", "editAt", "id", "publicationId", "text") SELECT "createdAt", "developerId", "editAt", "id", "publicationId", "text" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
