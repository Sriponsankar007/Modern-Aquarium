import { Product } from '../../types';
import { coreFish } from './coreFish';
import { coreEquipment } from './coreEquipment';
import { freshwaterCatalog } from './freshwater';
import { marineKoiBirdsCatalog } from './marineKoiBirds';
import { tanksPlantsCatalog } from './tanksPlants';
import { suppliesEquipmentCatalog } from './suppliesEquipment';

export const allCatalogProducts: Product[] = [
  ...coreFish,
  ...coreEquipment,
  ...freshwaterCatalog,
  ...marineKoiBirdsCatalog,
  ...tanksPlantsCatalog,
  ...suppliesEquipmentCatalog,
];

export {
  coreFish,
  coreEquipment,
  freshwaterCatalog,
  marineKoiBirdsCatalog,
  tanksPlantsCatalog,
  suppliesEquipmentCatalog
};
