// Tipos compartidos entre frontend y backend
export type ContractCategory =
  | 'LABORAL'
  | 'EMPRESARIAL'
  | 'ARRENDAMIENTO'
  | 'COMPRAVENTA'
  | 'SERVICIOS';
export type ContractSector =
  | 'CONSTRUCCION'
  | 'TECNOLOGIA'
  | 'SALUD'
  | 'EDUCACION'
  | 'COMERCIO'
  | 'RESTAURANTE'
  | 'TRANSPORTE';

export interface ContractWithDetails {
  id: string;
  title: string;
  description: string;
  category: ContractCategory;
  sector?: ContractSector;
  price: number;
  fileUrl: string;
  active: boolean;
  createdAt: Date;
}
