import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<{ total: number; items: FilmDto[] }> {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  async findSchedule(
    filmId: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    const items = await this.filmsRepository.findScheduleByFilmId(filmId);
    return { total: items.length, items };
  }
}
