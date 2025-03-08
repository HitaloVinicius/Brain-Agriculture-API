-- CreateTable
CREATE TABLE "Produtor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Produtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fazenda" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "area_total" DOUBLE PRECISION NOT NULL,
    "area_agricultavel" DOUBLE PRECISION NOT NULL,
    "area_vegetacao" DOUBLE PRECISION NOT NULL,
    "produtor_id" TEXT NOT NULL,

    CONSTRAINT "Fazenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Safra" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "fazenda_id" UUID NOT NULL,

    CONSTRAINT "Safra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultura" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "safra_id" UUID NOT NULL,

    CONSTRAINT "Cultura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fazenda" ADD CONSTRAINT "Fazenda_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "Produtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Safra" ADD CONSTRAINT "Safra_fazenda_id_fkey" FOREIGN KEY ("fazenda_id") REFERENCES "Fazenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cultura" ADD CONSTRAINT "Cultura_safra_id_fkey" FOREIGN KEY ("safra_id") REFERENCES "Safra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
