import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  brief: string;

  @Column({ default: '' })
  cover: string;

  @Column('text')
  contents: string;

  @Column()
  author: string;

  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn()
  category: Category;
}
