import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Midjourney } from 'midjourney';
import { base64ToBlob, nextNonce } from 'midjourney/libs/utils';

export interface ChatMessage {
  id: string;
  text: string;
  conversationId?: string;
  parentMessageId?: string;
}

@Injectable()
export class MidjourneyService implements OnModuleInit {
  Midjourney: Midjourney;
  constructor(private readonly configService: ConfigService) {
    this.Midjourney = new Midjourney({
      ServerId: this.configService.get<string>('SERVER_ID'),
      ChannelId: this.configService.get<string>('CHANNEL_ID'),
      SalaiToken: this.configService.get<string>('SALAI_TOKEN'),
      ImageProxy: this.configService.get<string>('IMAGE_PROXY'),
      Debug: true,
      Ws: true,
    });
  }
  async onModuleInit() {
    await this.Midjourney.init();
  }
  async Imagine(prompt: string, loading?: (uri: string) => void) {
    const msg = await this.Midjourney.Imagine(prompt, (uri: string) => {
      loading && loading(uri);
    });
    return msg;
  }
  async Avatar(img: string, loading?: (uri: string, progress: string) => void) {
    const blob = await base64ToBlob(img);
    const desc = await this.Midjourney.DescribeByBlob(blob);
    const prompt = `${desc.uri} half body, illustration for a children’s book, simple, cute, full-color, profile picture`;
    const msg = await this.Midjourney.Imagine(prompt, (uri, progress) => {
      loading && loading(uri, progress);
    });
    return msg;
  }

  async Custom(
    msgId: string,
    customId: string,
    flags: number,
    loading?: (uri: string, progress: string) => void,
  ) {
    const msg = await this.Midjourney.Custom({
      msgId,
      customId,
      flags,
      loading: (uri, progress) => {
        loading && loading(uri, progress);
      },
    });
    return msg;
  }

  //   async Variation(
  //     content: string,
  //     index: number,
  //     msgId: string,
  //     flags: number,
  //     msgHash: string,
  //     loading?: (uri: string) => void,
  //   ) {
  //     const msg = await this.Midjourney.Variation({
  //       content,
  //       index: index as any,
  //       msgId,
  //       hash: flags,
  //       loading: (uri: string) => {
  //         loading && loading(uri);
  //       },
  //     });
  //     return msg;
  //   }
  //   async Upscale(
  //     content: string,
  //     index: number,
  //     msgId: string,
  //     msgHash: string,
  //     loading?: (uri: string) => void,
  //   ) {
  //     const msg = await this.Midjourney.Upscale(
  //       content,
  //       index,
  //       msgId,
  //       msgHash,
  //       (uri: string) => {
  //         loading && loading(uri);
  //       },
  //     );
  //     return msg;
  //   }
}
