import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmListResponseDto, ScheduleListResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<FilmListResponseDto> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findSchedule(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }))
    id: string,
  ): Promise<ScheduleListResponseDto> {
    return this.filmsService.findSchedule(id);
  }

  @Get(':id/shedule')
  async findShedule(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }))
    id: string,
  ): Promise<ScheduleListResponseDto> {
    return this.filmsService.findSchedule(id);
  }
}
