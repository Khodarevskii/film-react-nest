import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';

export class FilmDto {
  @IsUUID()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;
}

export class ScheduleDto {
  @IsUUID()
  id: string;

  @IsString()
  daytime: string;

  @IsNumber()
  hall: number;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[];
}

export class FilmListResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  items: FilmDto[];
}

export class ScheduleListResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  items: ScheduleDto[];
}
