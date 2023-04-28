export type PromptMessageBody = {
  "prompt": string;
}

export type OptionMessageBody = {
  "content": string;
  "index": number;
  "msgId": string;
  "msgHash": string;
}