import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;

  const mockFilm: FilmDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    rating: 8.5,
    director: 'Test Director',
    tags: ['action', 'drama'],
    title: 'Test Film',
    about: 'About the film',
    description: 'Film description',
    image: 'image.jpg',
    cover: 'cover.jpg',
  };

  const mockSchedule: ScheduleDto = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    daytime: '2024-01-01T12:00:00',
    hall: 1,
    rows: 10,
    seats: 20,
    price: 500,
    taken: [],
  };

  const mockFilmsService = {
    findAll: jest.fn(),
    findSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return list of films with total count', async () => {
      const expected = { total: 1, items: [mockFilm] };
      mockFilmsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(result).toEqual(expected);
      expect(mockFilmsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty list when no films exist', async () => {
      const expected = { total: 0, items: [] };
      mockFilmsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('findSchedule', () => {
    it('should return schedule for a given film id', async () => {
      const filmId = '123e4567-e89b-12d3-a456-426614174000';
      const expected = { total: 1, items: [mockSchedule] };
      mockFilmsService.findSchedule.mockResolvedValue(expected);

      const result = await controller.findSchedule(filmId);

      expect(result).toEqual(expected);
      expect(mockFilmsService.findSchedule).toHaveBeenCalledWith(filmId);
    });

    it('should return empty schedule when no sessions found', async () => {
      const filmId = '123e4567-e89b-12d3-a456-426614174000';
      const expected = { total: 0, items: [] };
      mockFilmsService.findSchedule.mockResolvedValue(expected);

      const result = await controller.findSchedule(filmId);

      expect(result).toEqual(expected);
    });
  });

  describe('findShedule', () => {
    it('should return schedule using alternative spelling route', async () => {
      const filmId = '123e4567-e89b-12d3-a456-426614174000';
      const expected = { total: 1, items: [mockSchedule] };
      mockFilmsService.findSchedule.mockResolvedValue(expected);

      const result = await controller.findShedule(filmId);

      expect(result).toEqual(expected);
      expect(mockFilmsService.findSchedule).toHaveBeenCalledWith(filmId);
    });
  });
});
