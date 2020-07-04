export interface IAttributeDto {
  _id: string;
  name: string;
  specifications: ISpecificationDto[];
}

export interface ISpecificationDto {
  _id: string;
  name: string;
  icon: string;
}
