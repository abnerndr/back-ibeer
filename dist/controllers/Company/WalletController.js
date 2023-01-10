"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const companyRespository_1 = require("../../repositories/companyRespository");
class WalletController {
    async show(req, res) {
        const { company_id } = req.params;
        const company = await companyRespository_1.companyRespository.findOne({
            where: { id: company_id },
            relations: { wallet: true },
        });
        return res.json({ wallet: company === null || company === void 0 ? void 0 : company.wallet });
    }
}
exports.WalletController = WalletController;
