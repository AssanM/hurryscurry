// controllers/cartController.js

// Корзина больше не сохраняется в БД, всё приходит с фронта

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: 'itemId and size are required' });
    }

    // Эмуляция корзины — на фронте ты будешь держать объект cartData и слать его сюда
    return res.json({ success: true, message: 'Added to cart (frontend-managed)' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || typeof quantity !== 'number') {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    // Просто подтверждаем обновление — всё делается на фронте
    return res.json({ success: true, message: 'Cart updated (frontend-managed)' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    // В гостевом режиме корзина не хранится на сервере
    return res.json({ success: true, cartData: {} });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };