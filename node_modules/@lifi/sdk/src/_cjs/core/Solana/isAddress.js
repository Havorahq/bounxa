"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = isAddress;
const web3_js_1 = require("@solana/web3.js");
function isAddress(address) {
    try {
        new web3_js_1.PublicKey(address);
        return true;
    }
    catch (error) {
        return false;
    }
}
//# sourceMappingURL=isAddress.js.map