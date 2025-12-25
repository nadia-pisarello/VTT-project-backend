import { Test, TestingModule } from '@nestjs/testing';
import { PartidaService } from './partida.service';
import { Repository } from 'typeorm';
import { PartidaEntity } from './entidad/partida.entity';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PartidaService', () => {
  let service: PartidaService;
  let partidaRepository: jest.Mocked<Repository<PartidaEntity>>;
  let usuarioRepository: jest.Mocked<Repository<UsuarioEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartidaService,
        {
          provide: getRepositoryToken(PartidaEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            delete: jest.fn()
          },
        },
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            findOne: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<PartidaService>(PartidaService);
    partidaRepository = module.get(getRepositoryToken(PartidaEntity));
    usuarioRepository = module.get(getRepositoryToken(UsuarioEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
