import {
  clearCart,
  removeFromCart,
  Increase,
  Decrease,
} from "../../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state?.cart.cartItems);

  const totalCard = cartItems.reduce((total: any, item: any) => {
    return total + item.totalPrice;
  }, 0);

  const buttonClear = () => {
    dispatch(clearCart());
  };

  const buttonClearId = (id: any) => {
    dispatch(removeFromCart(id));
  };

  const buttonIncrease = (product: any) => {
    dispatch(Increase(product));
  };

  const buttonDecrease = (product: any) => {
    dispatch(Decrease(product));
  };

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {/*  //! */}
          {cartItems.map((item: any) => (
            <div
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              key={item._id}
            >
              <img
                src={item.image}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-xl text-gray-700 flex gap-1">
                    tiền gốc: <p>{item.price}</p> VNĐ
                  </p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100 justify-center">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => buttonDecrease(item)}
                    >
                      -
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={item.quantity}
                      min="1"
                    />
                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => buttonIncrease(item)}
                    >
                      +
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <p className="text-md flex gap-1">
                      Tiền gia tăng:
                      <p>
                        {
                          (item.totalPrice =
                            0 || item.totalPrice <= 0
                              ? item.price
                              : item.totalPrice)
                        }
                      </p>
                      vnđ
                    </p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => buttonClearId(item._id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* //! */}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Sản phẩm</p>
            <p className="text-gray-700">{totalCard} VNĐ</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">phí ship</p>
            <p className="text-gray-700">$0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Tổng tiền</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{totalCard} VNĐ</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Thanh toán
          </button>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={() => buttonClear()}
          >
            Xóa toàn bộ giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
