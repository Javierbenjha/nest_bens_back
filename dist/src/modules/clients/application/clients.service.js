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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
let ClientsService = class ClientsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(client) {
        if (client.documento) {
            const existingByDoc = await this.repo.findByDocumento(client.documento);
            if (existingByDoc) {
                throw new common_1.ConflictException(`Ya existe un cliente con el documento ${client.documento}`);
            }
        }
        if (client.correo) {
            const existingByEmail = await this.repo.findByEmail(client.correo);
            if (existingByEmail) {
                throw new common_1.ConflictException(`Ya existe un cliente con el correo ${client.correo}`);
            }
        }
        return this.repo.create(client);
    }
    findAll() {
        return this.repo.findAll();
    }
    findOne(id) {
        return this.repo.findById(id);
    }
    update(id, client) {
        return this.repo.update(id, client);
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ClientRepository')),
    __metadata("design:paramtypes", [Object])
], ClientsService);
//# sourceMappingURL=clients.service.js.map