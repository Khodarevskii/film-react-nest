import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    orderDto: CreateOrderDto,
  ): Promise<{ total: number; items: OrderResultDto[] }> {
    if (!orderDto.tickets || orderDto.tickets.length === 0) {
      throw new BadRequestException({ error: 'No tickets provided' });
    }

    const results: OrderResultDto[] = [];

    const ticketsBySession = new Map<string, typeof orderDto.tickets>();

    for (const ticket of orderDto.tickets) {
      const key = `${ticket.film}:${ticket.session}`;
      if (!ticketsBySession.has(key)) {
        ticketsBySession.set(key, []);
      }
      ticketsBySession.get(key).push(ticket);
    }

    for (const [, tickets] of ticketsBySession) {
      const filmId = tickets[0].film;
      const sessionId = tickets[0].session;
      const seats = tickets.map((t) => `${t.row}:${t.seat}`);

      const success = await this.filmsRepository.addTakenSeats(
        filmId,
        sessionId,
        seats,
      );

      if (!success) {
        throw new BadRequestException({
          error: 'Seats are already taken or session not found',
        });
      }

      for (const ticket of tickets) {
        const sessionInfo = await this.filmsRepository.getSessionInfo(
          filmId,
          sessionId,
        );

        results.push({
          id: uuidv4(),
          film: ticket.film,
          session: ticket.session,
          daytime: sessionInfo?.daytime || ticket.daytime,
          row: ticket.row,
          seat: ticket.seat,
          price: sessionInfo?.price || ticket.price,
        });
      }
    }

    return { total: results.length, items: results };
  }
}
