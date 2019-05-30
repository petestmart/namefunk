
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "project"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT
);

CREATE TABLE "words"
(
    "id" SERIAL PRIMARY KEY,
    "text" VARCHAR (255),
    "project_id" VARCHAR (255)
);