"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const Wallet_1 = require("./Wallet");
let Company = class Company {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-json", default: {}, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "stripe_customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-json", default: {}, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "stripe_subscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Company.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Company.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Company.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], Company.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Company.prototype, "cellphone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)("Product", (product) => product.company, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToOne)("Wallet", (wallet) => wallet.company, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Wallet_1.Wallet)
], Company.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array" }),
    __metadata("design:type", Array)
], Company.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    }),
    __metadata("design:type", Date)
], Company.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    }),
    __metadata("design:type", Date)
], Company.prototype, "updated_at", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)("companies")
], Company);
exports.Company = Company;
