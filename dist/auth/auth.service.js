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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const users_repository_1 = require("../users/repository/users.repository");
let AuthService = class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async register(dto) {
        const existingUser = await this.usersRepository.findByEmail(dto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Ya existe un usuario registrado con ese correo');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.usersRepository.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            isNotificationEnabled: dto.isNotificationEnabled ?? false,
        });
        const savedUser = await this.usersRepository.save(user);
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async login(dto) {
        const user = await this.usersRepository.findByEmail(dto.email);
        if (!user) {
            throw new common_1.BadRequestException('Correo o contrasena invalidos');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Correo o contrasena invalidos');
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map