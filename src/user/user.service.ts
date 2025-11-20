import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: SqlEntityRepository<User>,
    private readonly em: EntityManager,                      
  ) {}

  private sanitizeUser(user: User) {
    const { senha, ...sanitized } = user;
    return sanitized;
  }

  private hashPassword(senha: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(senha, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private isPasswordValid(rawPassword: string, storedPassword: string) {
    const [salt, storedHash] = storedPassword.split(':');
    const hash = scryptSync(rawPassword, salt, 64).toString('hex');
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
  }

  async create(createUserDto: CreateUserDto) {
        const senhaHash = this.hashPassword(createUserDto.senha);
    const user = this.userRepository.create({
      ...createUserDto,
      senha: senhaHash,
      nivel_acesso: '0'
    });

    await this.em.persistAndFlush(user);

    return this.sanitizeUser(user);
  }

  async login(loginUserDto: LoginUserDto) 
  {
    const user = await this.userRepository.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = this.isPasswordValid(loginUserDto.senha, user.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.sanitizeUser(user);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.sanitizeUser(user))
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id });
    return user ? this.sanitizeUser(user) : null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const payload = { ...updateUserDto } as Partial<User>;

    if (updateUserDto.senha) {
      payload.senha = this.hashPassword(updateUserDto.senha);
    }

    await this.userRepository.nativeUpdate({ id }, payload);

    const user = await this.userRepository.findOne({ id });
    return user ? this.sanitizeUser(user) : null;
  }

  remove(id: number) {
    return this.userRepository.nativeDelete(id);
  }
}
