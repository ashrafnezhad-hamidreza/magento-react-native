import { magento } from '../magento';

export const getProductThumbnailFromAttribute = product => {
	let result = magento.getProductMediaUrl();
	product.custom_attributes.some(attribute => {
		if (attribute.attribute_code === 'thumbnail') {
			result += attribute.value;
			return true;
		}
	});
	return result;
};

export const getProductCustomAttribute = (product, key) => {
	const attributes = product.custom_attributes.filter(attribute => {
		return attribute.attribute_code === key;
	});

	if (attributes.length) {
		return attributes[0];
	}
	return false;
};

export const getPriceFromChildren = products => {
  if (products) {
    const newPrice = products.reduce((minPrice, child) => {
      if (!minPrice) {
        return child.price;
      } else if (minPrice > child.price) {
        return child.price;
      }
      return minPrice;
    }, false);

    return newPrice;
  }

  return 0;
};
