/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `mapsLink` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the `EventAddress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EventAddress" DROP CONSTRAINT "EventAddress_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_favoritesId_fkey";

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "favoritesId",
DROP COLUMN "mapsLink",
ADD COLUMN     "address" TEXT;

-- DropTable
DROP TABLE "EventAddress";

-- CreateTable
CREATE TABLE "EventsInFavorites" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "favoritesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventsInFavorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventsToFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToFavorites_AB_unique" ON "_EventsToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToFavorites_B_index" ON "_EventsToFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userId_key" ON "Favorites"("userId");

-- AddForeignKey
ALTER TABLE "EventsInFavorites" ADD CONSTRAINT "EventsInFavorites_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsInFavorites" ADD CONSTRAINT "EventsInFavorites_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToFavorites" ADD CONSTRAINT "_EventsToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToFavorites" ADD CONSTRAINT "_EventsToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
