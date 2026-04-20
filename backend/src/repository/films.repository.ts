import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepository.find();
    return films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    }));
  }

  async findScheduleByFilmId(filmId: string): Promise<ScheduleDto[]> {
    const schedules = await this.scheduleRepository.find({
      where: { film: { id: filmId } },
    });
    return schedules.map((s) => ({
      id: s.id,
      daytime: s.daytime,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken,
    }));
  }

  async addTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<boolean> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, film: { id: filmId } },
    });
    if (!schedule) {
      return false;
    }

    for (const seat of seats) {
      if (schedule.taken.includes(seat)) {
        return false;
      }
    }

    schedule.taken = [...schedule.taken, ...seats];
    await this.scheduleRepository.save(schedule);
    return true;
  }

  async getSessionInfo(
    filmId: string,
    sessionId: string,
  ): Promise<{ daytime: string; price: number } | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, film: { id: filmId } },
    });
    if (!schedule) {
      return null;
    }
    return { daytime: schedule.daytime, price: schedule.price };
  }
}
