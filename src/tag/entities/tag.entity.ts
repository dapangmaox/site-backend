import { Article } from 'src/article/entities/article.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
