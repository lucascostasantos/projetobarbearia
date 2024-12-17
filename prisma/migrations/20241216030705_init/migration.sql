-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_password_key" ON "Clientes"("password");
