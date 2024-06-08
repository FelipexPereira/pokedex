export interface DatasApi {
  id: number;

  species: {
    name: string;
  };

  sprites: {
    other: {
      showdown: {
        front_default: string;
      };
    };
  };

  types: {
    type: {
      name: string;
    };
  };
}

export interface TypesApi {
  type: {
    name: string;
  };
}

export interface NameApi {
  value: string;
}

export interface Final {
  id: string;
  nome: string;
  img: string;
  tipe: [{ type: [{ name: string }] }];
}
