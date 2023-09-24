/*
  Warnings:

  - You are about to drop the `EventsInFavorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventsInFavorites" DROP CONSTRAINT "EventsInFavorites_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventsInFavorites" DROP CONSTRAINT "EventsInFavorites_favoritesId_fkey";

-- DropTable
DROP TABLE "EventsInFavorites";
