import { Body, Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import { MidjourneyService } from './midjourney.service';
import { FileInterceptor, } from '@nestjs/platform-express';
import { Response } from 'express';
import { OptionMessageBody, PromptMessageBody } from './interfaces';
@Controller("midjourney")
export class AppController {
  constructor(private readonly MjService: MidjourneyService) { }
  @Post("imagine")
  @UseInterceptors(FileInterceptor(''))
  async Imagine(@Body() data: PromptMessageBody, @Res() res: Response) {
    const msg = await this.MjService.Imagine(data.prompt, (uri: string) => {
      res.write(JSON.stringify({ uri }))
    })
    res.write(JSON.stringify(msg));
    res.end();
  }
  @Post("variation")
  @UseInterceptors(FileInterceptor(''))
  async Variation(@Body() data: OptionMessageBody, @Res() res: Response) {
    const msg = await this.MjService.Variation(data.content, data.index, data.msgId, data.msgHash,
      (uri: string) => {
        res.write(JSON.stringify({ uri }))
      })
    res.write(JSON.stringify(msg));
    res.end();
  }
  @Post("upscale")
  @UseInterceptors(FileInterceptor(''))
  async Upscale(@Body() data: OptionMessageBody, @Res() res: Response) {
    const msg = await this.MjService.Upscale(data.content, data.index, data.msgId, data.msgHash, (uri: string) => {
      res.write(JSON.stringify({ uri }))
    })
    res.write(JSON.stringify(msg));
    res.end();
  }
}
