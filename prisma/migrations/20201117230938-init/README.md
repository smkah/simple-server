# Migration `20201117230938-init`

This migration has been generated by samukah at 11/17/2020, 8:09:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Post" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Profile" (
"id" SERIAL,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Tag" (
"id" SERIAL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
)

CREATE TABLE "Task" (
"id" SERIAL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Token" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "ip" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "User" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "password" TEXT,
    "username" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "Permission" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Role" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "RolePermission" (
"id" SERIAL,
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "UserRole" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Profile.userId_unique" ON "Profile"("userId")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

ALTER TABLE "Post" ADD FOREIGN KEY("authorId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Profile" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Task" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Token" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "RolePermission" ADD FOREIGN KEY("permissionId")REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "RolePermission" ADD FOREIGN KEY("roleId")REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "UserRole" ADD FOREIGN KEY("roleId")REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "UserRole" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201117230938-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,97 @@
+generator client {
+  provider        = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Post {
+  id        Int      @id @default(autoincrement())
+  title     String
+  createdAt DateTime @default(now())
+  content   String?
+  published Boolean  @default(false)
+  authorId  Int
+  User      User     @relation(fields: [authorId], references: [id])
+}
+
+model Profile {
+  id     Int     @id @default(autoincrement())
+  bio    String?
+  userId Int     @unique
+  User   User    @relation(fields: [userId], references: [id])
+}
+
+model Tag {
+  id          Int       @id @default(autoincrement())
+  description String
+  createdAt   DateTime
+  updatedAt   DateTime?
+  deletedAt   DateTime?
+}
+
+model Task {
+  id          Int       @id @default(autoincrement())
+  description String
+  createdAt   DateTime
+  updatedAt   DateTime?
+  deletedAt   DateTime?
+  userId      Int
+  status      Boolean
+  User        User      @relation(fields: [userId], references: [id])
+}
+
+model Token {
+  id     Int     @id @default(autoincrement())
+  userId Int
+  token  String
+  ip     String?
+  User   User    @relation(fields: [userId], references: [id])
+}
+
+model User {
+  id        Int        @id @default(autoincrement())
+  name      String
+  email     String     @unique
+  createdAt DateTime
+  updatedAt DateTime?
+  deletedAt DateTime?
+  password  String?
+  username  String?
+  Post      Post[]
+  Profile   Profile?
+  Task      Task[]
+  Token     Token[]
+  UserRole  UserRole[]
+}
+
+model Permission {
+  id             Int              @id @default(autoincrement())
+  name           String
+  RolePermission RolePermission[]
+}
+
+model Role {
+  id             Int              @id @default(autoincrement())
+  name           String
+  RolePermission RolePermission[]
+  UserRole       UserRole[]
+}
+
+model RolePermission {
+  id           Int        @id @default(autoincrement())
+  roleId       Int
+  permissionId Int
+  Permission   Permission @relation(fields: [permissionId], references: [id])
+  Role         Role       @relation(fields: [roleId], references: [id])
+}
+
+model UserRole {
+  id     Int  @id @default(autoincrement())
+  userId Int
+  roleId Int
+  Role   Role @relation(fields: [roleId], references: [id])
+  User   User @relation(fields: [userId], references: [id])
+}
```


