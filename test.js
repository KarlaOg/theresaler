const arr = [
  {
    '@id': '/api/purchase_items/112',
    '@type': 'PurchaseItem',
    product: {
      '@id': '/api/products/31',
      '@type': 'Product',
      purchaseItems: ['/api/purchase_items/112'],
    },
    productName: 'Practical Bronze Knife',
    productPrice: 1,
    purchase: null,
  },
];

const purchaseItemId = arr
  .flatMap((e) => Object.values(e.product)[0])
  .toString()
  .split('/')
  .pop();

// const tesrt = purchaseItemId.forEach((e) => e);
//   .map((e) => e.purchaseItems[0])
//   .toString()
//   .split('/')
//   .pop();
// const productId = arr
//   .map((e) => e.product)
//   .flatMap((e) => e.purchaseItems)
//   .flatMap((e) => e.product)
//   .toString()
//   .split(',')
//   .pop()
//   .split('/')
//   .pop();

// console.log(purchaseItemId);

const arr2 = [
  {
    id: 198,
    product: '/api/products/7',
    productName: 'Enormous Concrete Keyboard',
    productPrice: 79,
    purchase: null,
    productId: 7,
  },
  {
    id: 199,
    product: '/api/products/7',
    productName: 'Enormous Concrete Keyboard',
    productPrice: 79,
    purchase: null,
    productId: 7,
  },
];

// const searchId = arr2.find(
//     (element) => element === product
//   );
const test = arr2.every(function (element, index, array) {
  //   console.log('élément :', element);
  console.log(element.id);
  if (element.productId[0] === 7) {
    return element.id;
  }
});
console.log(test);
