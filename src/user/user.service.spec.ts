import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';

const repositoryMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  nativeUpdate: jest.fn(),
  nativeDelete: jest.fn(),
};

const entityManagerMock = {
  persistAndFlush: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
            providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: repositoryMock },
        { provide: EntityManager, useValue: entityManagerMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
