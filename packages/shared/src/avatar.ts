export interface AvatarLayer {
  name: string;
  asset: string;
}

export interface Avatar {
  id: string;
  layers: AvatarLayer[];
}
