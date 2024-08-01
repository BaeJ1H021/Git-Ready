export type GraphItem =
  | { type: 'branch'; name: string; from: string | null }
  | { type: 'commit'; branch: string; message: string }
  | { type: 'merge'; from: string; to: string }
  | { type: 'tag'; branch: string; tag: string };

export interface Branches {
  [key: string]: any;
}
