import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @Column()
  daytime: string;

  @Column({ type: 'integer' })
  hall: number;

  @Column({ type: 'integer' })
  rows: number;

  @Column({ type: 'integer' })
  seats: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'text', array: true, default: [] })
  taken: string[];
}
