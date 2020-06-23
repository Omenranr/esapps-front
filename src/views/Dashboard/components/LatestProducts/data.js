import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'Blocks',
    imageUrl: '/images/products/blocks.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Dessin et Ecriture',
    imageUrl: '/images/products/dessinEcriture.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Listen and Answer',
    imageUrl: '/images/products/listenandanswer.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Puzzles',
    imageUrl: '/images/products/puzzle.png',
    updatedAt: moment().subtract(5, 'hours')
  },
];
