import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { MidjourneyService } from './midjourney.service';
import { FastifyReply } from 'fastify';
// import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AvatarBody, OptionMessageBody, PromptMessageBody } from './interfaces';
@Controller('midjourney')
export class AppController {
  constructor(private readonly MjService: MidjourneyService) {}
  @Post('imagine')
  @UseInterceptors()
  async Imagine(@Body() data: PromptMessageBody, @Res() res: FastifyReply) {
    res.raw.setHeader('Content-Type', 'text/plain');
    res.raw.setHeader('Transfer-Encoding', 'chunked');
    const msg = await this.MjService.Imagine(data.prompt, (uri: string) => {
      res.raw.write(JSON.stringify({ uri }));
    });
    res.raw.write(JSON.stringify(msg));
    res.raw.end();
  }

  @Post('avatar')
  @UseInterceptors()
  async Avatar(@Body() data: AvatarBody, @Res() res: Response) {
    this.MjService.Avatar(data.img, (uri: string) => {
      res.write(JSON.stringify({ uri }));
    });
    res.end();
  }
}
