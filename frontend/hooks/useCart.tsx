import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleQtyIncrease: (product: CartProductType) => void;
  handleQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eshopPaymentIntent: any = localStorage.getItem("eshopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eshopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const totalQty =
      cartProducts?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    setCartTotalQty(totalQty);
  }, [cartProducts]);

  useEffect(() => {
    const getTotals = () => {
        if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      };
    }
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (!prev) {
        updatedCart = [product];
      } else {
        updatedCart = [...prev, product];
      }
      toast.success("Product added to cart");
      localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filterProducts);
        toast.success("Product removed");
        localStorage.setItem("eShopItems", JSON.stringify(filterProducts));
      }
    },
    [cartProducts]
  );

  const handleQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 99) {
        return toast.error("Oops! Maximum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity += 1;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) {
        handleRemoveProductFromCart(product);
        return;
      }

      if (cartProducts) {
        const updatedCart = cartProducts.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });

        setCartProducts(updatedCart);
        localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts, handleRemoveProductFromCart]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.removeItem("eShopItems");
    toast.success("Cart has been cleared");
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("eshopPaymentIntent", JSON.stringify(val));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleQtyIncrease,
    handleQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
