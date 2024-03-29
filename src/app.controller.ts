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
import {
  AvatarBody,
  Base64Body,
  CustomBody,
  PromptMessageBody,
} from './interfaces';
@Controller('midjourney')
export class AppController {
  constructor(private readonly MjService: MidjourneyService) {}
  @Post('imagine')
  @UseInterceptors()
  async Imagine(@Body() data: PromptMessageBody, @Res() res: FastifyReply) {
    res.raw.setHeader('Content-Type', 'text/html; charset=utf-8');
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

  @Post('base64')
  @UseInterceptors()
  async Base64(@Body() data: Base64Body, @Res() res: FastifyReply) {
    const uri = await this.MjService.UploadImg(data.img);
    res.send({ uri });
    // res.raw.setHeader('Content-Type', 'text/html; charset=utf-8');
    // res.raw.setHeader('Transfer-Encoding', 'chunked');
    // res.raw.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    // res.raw.setHeader('Pragma', 'no-cache');
    // res.raw.setHeader('Expires', '0');
    // const msg = await this.MjService.Avatar(data.img, (uri, progress) => {
    //   res.raw.write(JSON.stringify({ uri, progress }));
    // });
    // res.raw.write(JSON.stringify(msg));
    // res.raw.end();
  }

  @Post('avatar')
  @UseInterceptors()
  async Avatar(@Body() data: AvatarBody, @Res() res: FastifyReply) {
    res.raw.setHeader('Content-Type', 'text/html; charset=utf-8');

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
  @Post('custom')
  @UseInterceptors()
  async Custom(@Body() data: CustomBody, @Res() res: FastifyReply) {
    res.raw.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.raw.setHeader('Transfer-Encoding', 'chunked');
    res.raw.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.raw.setHeader('Pragma', 'no-cache');
    res.raw.setHeader('Expires', '0');
    //utf-8
    const msg = await this.MjService.Custom(
      data.msgId,
      data.customId,
      data.flags,
      (uri, progress) => {
        res.raw.write(JSON.stringify({ uri, progress }));
      },
    );
    res.raw.write(JSON.stringify(msg));
    res.raw.end();
  }
}
