import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly author: string;
  @ApiProperty()
  readonly cover: string;
  @ApiProperty()
  readonly contents: string;
  @ApiProperty()
  readonly categoryId: number;
  @ApiProperty({ isArray: true })
  readonly tagIds: number[];
}
