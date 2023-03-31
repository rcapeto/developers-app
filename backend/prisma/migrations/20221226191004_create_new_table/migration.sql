-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "editAt" DATETIME NOT NULL,
    "text" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    CONSTRAINT "Comments_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
