import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usuarioServ: jest.Mocked<UsuarioService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: UsuarioService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usuarioServ = module.get(UsuarioService);
    jwtService = module.get(JwtService);
  });

  it('should return user without password if credentials are valid', async () => {
    const usuarioMock = {
      id: 1,
      email: 'test@email.com',
      password: 'hashedPassword'
    };
    usuarioServ.findByEmail.mockResolvedValue(usuarioMock as any);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    const result = await service.validateUser(
      'test@email.com',
      'plainPassword',
    );
    expect(usuarioServ.findByEmail).toHaveBeenCalledWith('test@email.com');
    expect(result).toBeDefined();
    expect(result.email).toBe('test@email.com');
  });

  it('should return null if user is not found', async () => {
    usuarioServ.findByEmail.mockResolvedValue(null);
    const result = await service.validateUser(
      'no@mail.com',
      'anyPassword',
    );
    expect(result).toBeNull();
  });

  it('should return null if password is invalid', async () => {
    const usuarioMock = {
      id: 1,
      email: 'test@email.com',
      password: 'hashedPassword'
    };
    usuarioServ.findByEmail.mockResolvedValue(usuarioMock as any);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
    const result = await service.validateUser(
      'test@email.com',
      'wrongPassword',
    );
    expect(result).toBeNull();
  });

  it('should return an access token on login', async () => {
    const usuarioMock = {
      id: 1,
      email: 'test@email.com',
    };
    const tokenMock = 'jwtToken';
    jwtService.sign.mockReturnValue(tokenMock);
    const result = await service.login(usuarioMock as any);
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: usuarioMock.id,
      email: usuarioMock.email,
    });
    expect(result).toEqual({ access_token: tokenMock });
  })
});
