export interface TodoImage {
  id: number;
  imageName: string;
}

export interface Todo {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  images: TodoImage[];
}