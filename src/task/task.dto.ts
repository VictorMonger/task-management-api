export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: Date;
  expirationDate: Date;
}

export interface FindALLparameters {
  title: string;
  status: string;
}
