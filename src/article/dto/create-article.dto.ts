import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly cover: string;
  @ApiProperty()
  readonly body: string;
  @ApiProperty()
  readonly category: string;
  @ApiProperty()
  readonly tagList: string[];
}
