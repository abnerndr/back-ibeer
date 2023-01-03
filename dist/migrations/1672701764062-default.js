"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1672701764062 = void 0;
class default1672701764062 {
    constructor() {
        this.name = 'default1672701764062';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_id" uuid, "stripe_customer" text NOT NULL, "stripe_subscription" text NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "document" text NOT NULL, "cellphone" text NOT NULL, "description" text NOT NULL, "roles" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_d0af6f5866201d5cb424767744a" UNIQUE ("email"), CONSTRAINT "UQ_13496c970093729e7ab04eb7da4" UNIQUE ("document"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid, "product_name" text NOT NULL, "description" text NOT NULL, "photo_url" text, "categories" text NOT NULL, "price_in_cents" integer NOT NULL, "ibeer_taxe_in_cents" integer NOT NULL, "discount_in_percent" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "company_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subscription_id" uuid, "name" character varying NOT NULL, "email" character varying NOT NULL, "amount" integer NOT NULL, "status" character varying NOT NULL, "is_active" boolean NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet_id" uuid, "account_value_in_cents" integer NOT NULL, "account_value_pending" integer NOT NULL, "withdrawn_amount" integer NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "document" text NOT NULL, "cellphone" text NOT NULL, "roles" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_c1b20b2a1883ed106c3e746c25a" UNIQUE ("document"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_b417f1726f6ccafb18730adffb0" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_b417f1726f6ccafb18730adffb0"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }
}
exports.default1672701764062 = default1672701764062;
