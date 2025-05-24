export interface Visitor {
  VisitorID?: number;
  IPAddress: string;
  UserAgent: string;
  VisitTime: Date | string;
  IsUnique?: boolean;
}
