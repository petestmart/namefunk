
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
    "user_id" INT REFERENCES "user",
    "project_name" VARCHAR NOT NULL
);

CREATE TABLE "words"
(
    "id" SERIAL PRIMARY KEY,
    "text" VARCHAR (255),
    "project_id" INT REFERENCES "project" ON DELETE CASCADE
);

CREATE TABLE "get" (
	"id" SERIAL PRIMARY KEY,
	"syn" VARCHAR (25)
);

CREATE TABLE "post" (
	"id" SERIAL PRIMARY KEY,
	"syn" VARCHAR (25)
);

CREATE TABLE "put" (
	"id" SERIAL PRIMARY KEY,
	"syn" VARCHAR (25)
);

CREATE TABLE "delete" (
	"id" SERIAL PRIMARY KEY,
	"syn" VARCHAR (25)
);

INSERT INTO "get" (syn) VALUES ('get'),('fetch'),('bring'),('grab'),('pickUp'),('extract'),('snag'),('wrangle'),('goGet'),('obtain');

INSERT INTO "post" (syn) VALUES ('post'),('place'),('put'),('set'),('situate'),('mail'),('deliver'),('handOff'),('shoot'),('truck');

INSERT INTO "put" (syn) VALUES ('put'),('update'),('adjust'),('revise'),('modify'),('shift'),('alter'),('transmutate'),('change'),('switch');

INSERT INTO "delete" (syn) VALUES ('delete'),('remove'),('destroy'),('wipeOut'),('eliminate'),('cancel'),('squash'),('cutOut'),('expunge'),('cut');