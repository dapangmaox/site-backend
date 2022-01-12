import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}
  create(createArticleDto: CreateArticleDto) {
    let article = new Article();
    article.author = '大胖猫';
    article.title = createArticleDto.title;
    article.description = createArticleDto.description;
    article.cover = createArticleDto.cover;
    article = { ...article, ...createArticleDto };
    console.log(article);

    this.articleRepository.save(article);
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findOne(id: string) {
    return this.articleRepository.findOne({ id });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
