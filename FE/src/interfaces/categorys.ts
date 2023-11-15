export interface ICategory {
  _id: string;
  id?: string;
  name?: string;
  books?: {
    _id: string;
    length: number;
  };
}
