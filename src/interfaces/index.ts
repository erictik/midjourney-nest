export type PromptMessageBody = {
  prompt: string;
};

export type OptionMessageBody = {
  content: string;
  index: number;
  msgId: string;
  msgHash: string;
};

export type AvatarBody = {
  img: string;
};
export type Base64Body = {
  img: string;
};

export type CustomBody = {
  flags: number;
  msgId: string;
  customId: string;
};
