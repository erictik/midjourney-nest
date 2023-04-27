import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Midjourney as MJApi } from 'midjourney'

export interface ChatMessage {
    id: string;
    text: string;
    conversationId?: string;
    parentMessageId?: string;
}

@Injectable()
export class MidjourneyService implements OnModuleInit {
    private server_id: string;
    private chanel_id: string;
    private salai_token: string;
    MJApi: MJApi;
    constructor(private readonly configService: ConfigService) {
        this.server_id = this.configService.get<string>('SERVER_ID');
        this.chanel_id = this.configService.get<string>('CHANNEL_ID');
        this.salai_token = this.configService.get<string>('SALAI_TOKEN');
        this.MJApi = new MJApi(this.server_id, this.chanel_id, this.salai_token)
    }
    async onModuleInit() {
    }
    async Imagine(prompt: string,loading?: (uri: string) => void) {
        const msg = await this.MJApi.Imagine(prompt, (uri: string) => {
            loading && loading(uri)
        })
        return msg
    }

}