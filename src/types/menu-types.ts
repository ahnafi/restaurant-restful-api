interface CreateMenuRequest {
  name: string;
  category: number;
  price: string;
  description: string;
}

interface CreateMenuResult {
  id: number;
  name: string;
  price: string;
  description: string | null;
  image: string;
  category: {
    id: number;
    name: string;
  } | null;
}
