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
import { AvatarBody, PromptMessageBody } from './interfaces';
@Controller('midjourney')
export class AppController {
  constructor(private readonly MjService: MidjourneyService) {}
  @Post('imagine')
  @UseInterceptors()
  async Imagine(@Body() data: PromptMessageBody, @Res() res: FastifyReply) {
    res.raw.setHeader('Content-Type', 'text/html');
    res.raw.setHeader('Transfer-Encoding', 'chunked');
    res.raw.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.raw.setHeader('Pragma', 'no-cache');
    res.raw.setHeader('Expires', '0');
    const msg = await this.MjService.Imagine(data.prompt, (uri: string) => {
      res.raw.write(JSON.stringify({ uri }));
    });
    res.raw.write(JSON.stringify(msg));
    res.raw.end();
  }

  @Post('avatar')
  @UseInterceptors()
  async Avatar(@Body() data: AvatarBody, @Res() res: FastifyReply) {
    res.raw.setHeader('Content-Type', 'text/html');
    res.raw.setHeader('Transfer-Encoding', 'chunked');
    res.raw.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.raw.setHeader('Pragma', 'no-cache');
    res.raw.setHeader('Expires', '0');

    const msg = await this.MjService.Avatar(data.img, (uri, progress) => {
      res.raw.write(JSON.stringify({ uri, progress }));
    });
    res.raw.write(JSON.stringify(msg));
    res.raw.end();
  }
}
