import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entidad/usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepo: jest.Mocked<Repository<UsuarioEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService,
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepo = module.get(getRepositoryToken(UsuarioEntity));
  });

  it('should return user by id', async () => {
    const usuarioMock = {
      id: 1,
      personaje: [
        { id: 1 },
        { id: 2 }
      ]
    };
    usuarioRepo.findOne.mockResolvedValue(usuarioMock as any);
    const result = await service.findOne(1);
    expect(usuarioRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['personajes'] });
    expect(result).toBe(usuarioMock);
  });

  it('should throw NotFoundException if user not found by id', async () => {
    usuarioRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow('Usuario no encontrado');
  });

  it('should return user by email, normalize email to lowercase', async () => {
    await service.findByEmail('TEST.MAIL');
    expect(usuarioRepo.findOne).toHaveBeenCalledWith({ where: { email: 'test.mail' } });
  });

  it('should return all users', async () => {
    const usuariosMock = [
      { id: 1 },
      { id: 2 },
    ];
    usuarioRepo.find.mockResolvedValue(usuariosMock as any);
    const result = await service.findAll();
    expect(usuarioRepo.find).toHaveBeenCalled();
    expect(result).toBe(usuariosMock);
  });

  it('should create a new user with hashed password', async () => {
    const crearUsuarioDto = {
      nombre: 'Test User',
      email: 'test.mail',
      password: 'plainPassword',
    };
    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt' as never);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

    usuarioRepo.findOne.mockResolvedValue(null);
    usuarioRepo.create.mockImplementation((data) => data as any);
    usuarioRepo.save.mockImplementation((data) => ({ id: 1, ...data } as any));

    const result = await service.create(crearUsuarioDto);

    expect(usuarioRepo.findOne).toHaveBeenCalledWith({
      where: { email: 'test.mail' },
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 'salt');
    expect(result.password).toBe('hashedPassword');
  });

  it('should throw BadRequestException if email already exists on create', async () => {
    const crearUsuarioDto = {
      nombre: 'Test User',
      email: 'test.mail',
      password: 'plainPassword',
    };
    usuarioRepo.findOne.mockResolvedValue({ email: 'test.mail' } as any);
    await expect(service.create(crearUsuarioDto)).rejects.toThrow('El email ya está registrado');
  })

  it('should return user updated', async () => {
    const updateUsuarioDto = {
      nombre: 'Updated Name',
    }
    const usuarioMock = {
      id: 1,
      nombre: 'Old Name',
    }
    usuarioRepo.findOne.mockResolvedValue(usuarioMock as any);
    usuarioRepo.save.mockImplementation((data) => data as any);
    const result = await service.update(1, updateUsuarioDto);
    expect(usuarioRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['personajes'] });
    expect(usuarioRepo.save).toHaveBeenCalledWith({ ...usuarioMock, ...updateUsuarioDto });
    expect(result.nombre).toBe('Updated Name');
  });

  it('should throw BadRequestException if email already exists on update', async () => {
    const updateUsuarioDto = {
      email: 'existing.mail',
    };
    const usuarioMock = {
      id: 1,
      email: 'old.mail',
    }
    const existingUsuarioMock = {
      id: 2,
      email: 'existing.mail',
    }
    usuarioRepo.findOne
      .mockResolvedValueOnce(usuarioMock as any)
      .mockResolvedValueOnce(existingUsuarioMock as any);
    await expect(service.update(1, updateUsuarioDto)).rejects.toThrow('El email ya está registrado');
  });

  it('should hash password if updated', async () => {
    const updateUsuarioDto = {
      password: 'newPassword',
    };
    const usuarioMock = {
      id: 1,
      password: 'oldHashedPassword',
    }
    usuarioRepo.findOne.mockResolvedValue(usuarioMock as any);
    usuarioRepo.save.mockImplementation((data) => data as any);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('newHashedPassword' as never);
    const result = await service.update(1, updateUsuarioDto);
    expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
    expect(usuarioRepo.save).toHaveBeenCalledWith({ ...usuarioMock, password: 'newHashedPassword' });
    expect(result.password).toBe('newHashedPassword');
  });

  it('should remove user', async () => {
    const usuarioMock = {
      id: 1,
    }
    usuarioRepo.findOne.mockResolvedValue(usuarioMock as any);
    usuarioRepo.remove.mockImplementation((data) => data as any);
    const result = await service.remove(1);
    expect(usuarioRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['personajes'] });
    expect(usuarioRepo.remove).toHaveBeenCalledWith(usuarioMock);
    expect(result).toBe(usuarioMock);
  });

  it('should throw NotFoundException on remove if user does not exist', async () => {
    usuarioRepo.findOne.mockResolvedValue(null);
    await expect(service.remove(999)).rejects.toThrow('Usuario no encontrado');
  });
});
