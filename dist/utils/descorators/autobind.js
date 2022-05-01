"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoBind = void 0;
function AutoBind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjDescriptor;
}
exports.AutoBind = AutoBind;
;
//# sourceMappingURL=autobind.js.map