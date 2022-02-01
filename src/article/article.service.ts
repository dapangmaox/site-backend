import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    const article = new Article();
    article.title = createArticleDto.title;
    article.author = createArticleDto.author;
    article.cover = createArticleDto.cover;
    article.contents = createArticleDto.contents;

    article.category = { ...new Category(), id: createArticleDto.categoryId };

    article.tags = createArticleDto.tagIds?.map((tagId) => {
      const tag = new Tag();
      tag.id = tagId;
      return tag;
    });

    const newArticle = await this.articleRepository.save(article);

    return newArticle;
  }

  findAll(): Promise<Article[]> {
    const options: FindManyOptions = {
      relations: ['category', 'tags'],
    };
    return this.articleRepository.find(options);
  }

  findOne(id: string) {
    return this.articleRepository.findOne(
      { id },
      { relations: ['category', 'tags'] },
    );
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const toUpdate = await this.articleRepository.findOne(id);
    toUpdate.title = updateArticleDto.title || toUpdate.title;
    toUpdate.cover = updateArticleDto.cover || toUpdate.cover;
    toUpdate.contents = updateArticleDto.contents || toUpdate.contents;
    toUpdate.categoryId = updateArticleDto.categoryId || toUpdate.categoryId;
    if (updateArticleDto.tagIds?.length > 0) {
      const tags = updateArticleDto.tagIds.map((tagId) => {
        const tag = new Tag();
        tag.id = tagId;
        return tag;
      });
      toUpdate.tags = tags;
    }
    this.articleRepository.save(toUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
