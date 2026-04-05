import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { FilmDto } from '../films/dto/films.dto';
import { ScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmModel.find().exec();
    return films.map((film) => {
      const obj = film.toJSON();
      return {
        id: obj.id,
        rating: obj.rating,
        director: obj.director,
        tags: obj.tags,
        title: obj.title,
        about: obj.about,
        description: obj.description,
        image: obj.image,
        cover: obj.cover,
      };
    });
  }

  async findScheduleByFilmId(filmId: string): Promise<ScheduleDto[]> {
    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      return [];
    }
    return film.schedule.map((s) => ({
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
    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      return false;
    }

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      return false;
    }

    for (const seat of seats) {
      if (session.taken.includes(seat)) {
        return false;
      }
    }

    session.taken.push(...seats);

    await film.save();
    return true;
  }

  async getSessionInfo(
    filmId: string,
    sessionId: string,
  ): Promise<{ daytime: string; price: number } | null> {
    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      return null;
    }
    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      return null;
    }
    return { daytime: session.daytime, price: session.price };
  }
}
