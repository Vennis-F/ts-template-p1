import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt/jwt-authentication.guard';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  // @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    console.log('CreatePost');
    return this.postsService.createPost(post);
  }

  // @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
