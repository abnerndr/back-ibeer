import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671108426621 implements MigrationInterface {
    name = 'default1671108426621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "company_id" TO "companyCompanyId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "companyCompanyId" TO "company_id"`);
    }

}
