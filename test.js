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

console.log(purchaseItemId);
