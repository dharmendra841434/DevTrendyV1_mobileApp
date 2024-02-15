import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAccessToken = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
};

export const removeAccessToken = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
};

export function calculateDiscountedPrice(originalPrice, discountPercentage) {
  if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
    return 'Invalid input. Please provide valid values.';
  }

  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;

  return Math.floor(discountedPrice);
}

export const colors = {
  black: '#191919',
  blue: '#1D2B53',
  cream: '#FFE7C1',
  purple: '#872341',
  cream404: '#FECDA6',
  green404: '#99B080',
  gray: '#A4AB9D',
};

export function isAddedToCart(array, id) {
  //console.log(array[0]?._id === id, 'akjsiku');
  return array?.length > 0 && array?.some(obj => obj._id === id);
}

export function addCommasToRupees(amount) {
  // Convert the number to a string
  let amountString = amount.toString();
  // Split the string into integer and decimal parts
  const parts = amountString.split('.');
  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Join the integer and decimal parts with a dot
  const formattedAmount = parts.join('.');
  return formattedAmount;
}

export function generateTwoDigitNumber() {
  // Generate a random number between 10 and 99 (inclusive)
  const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;

  return randomNumber;
}
export function calculateTotalPrice(objectsArray) {
  let total = objectsArray?.reduce((total, obj) => {
    return (
      total + obj?.quantity * calculateDiscountedPrice(obj.price, obj.discount)
    );
  }, 0);

  return total;
}
export function calculateTotalAtualPrice(objectsArray) {
  let total = objectsArray?.reduce((total, obj) => {
    return total + obj?.quantity * obj.price;
  }, 0);

  return total;
}

export function sortString(inputString, maxLength) {
  if (inputString?.length > maxLength) {
    return inputString?.substring(0, maxLength - 3) + '...';
  } else {
    return inputString;
  }
}

export function changeSelectedColor(array, id, newValue) {
  const updatedArray = array.map(item => {
    if (item._id === id) {
      // Modify the specified field for the object with the matching ID
      return {...item, selectedColor: newValue};
    }
    return item;
  });

  return updatedArray;
}
export function changeSelectedSize(array, id, newValue) {
  const updatedArray = array.map(item => {
    if (item._id === id) {
      // Modify the specified field for the object with the matching ID
      return {...item, size: newValue};
    }
    return item;
  });

  return updatedArray;
}

export function increasQty(array, id, preValue) {
  const updatedArray = array.map(item => {
    if (item._id === id) {
      // Modify the specified field for the object with the matching ID
      return {...item, quantity: preValue + 1};
    }
    return item;
  });

  return updatedArray;
}

export function decreasQty(array, id, preValue) {
  const updatedArray = array.map(item => {
    if (item._id === id) {
      // Modify the specified field for the object with the matching ID
      return {...item, quantity: preValue - 1};
    }
    return item;
  });

  return updatedArray;
}

export const updateStepCompletion = (
  index,
  newIsComplete,
  setStepsData,
  stepsData,
) => {
  const updatedStepsData = [...stepsData];
  updatedStepsData[index] = {
    ...updatedStepsData[index],
    isComplete: newIsComplete,
  };
  setStepsData(updatedStepsData);
};
