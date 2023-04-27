import { Body, Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import { MidjourneyService } from './midjourney.service';
import { FileInterceptor, } from '@nestjs/platform-express';
// import { Readable } from 'stream';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { Readable } from 'stream';
import { get } from 'http';
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
type MessageBody = {
  "prompt": string;
}
@Controller("midjourney")
export class AppController {
  constructor(private readonly MjService: MidjourneyService) { }
  @Post("imagine")
  @UseInterceptors(FileInterceptor(''))
  async Imagine(@Body() data: MessageBody, @Res() res: Response) {
    const msg = await this.MjService.Imagine(data.prompt, (uri: string) => {
      res.write(JSON.stringify({ uri }))
    })
    res.write(JSON.stringify(msg));
    res.end();
  }
}
