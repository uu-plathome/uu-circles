import { PagePositions } from '../lib/types/model/PagePosition'

export type PagePositionRecord = {
  pagePositionHistoryId: number
  createdAt: string
}

export type UsePagePosition = {
  pagePositionId: string;
  pageData: PagePositions;
  pageUrl: string;
  circleSlug?: string | undefined;
  identifierHash?: string | undefined;
  recordPagePosition: PagePositionRecord[];
  onChangeId: (_pagePositionId: string) => Promise<void>;
}
export type UsePagePositionArg = {
  pageUrl: string;
  pageName: string;
  circleSlug?: string | undefined;
  identifierHash?: string | undefined;
}
