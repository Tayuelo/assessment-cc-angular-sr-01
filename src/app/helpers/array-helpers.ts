import { Monster } from '../interfaces/monster.interface';

const getRandomObject = (monsters: Monster[], monster: Monster | null) => {
  if (!monster) return null;
  const filteredArray = monsters.filter((ms) => ms.id !== monster.id);
  const randomIndex = Math.floor(Math.random() * filteredArray.length);
  return filteredArray[randomIndex];
};

export { getRandomObject };
