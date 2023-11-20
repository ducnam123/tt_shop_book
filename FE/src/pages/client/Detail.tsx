import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/product";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import {
  useGetCommentByIdQuery,
  useAddCommentMutation,
} from "../../api/comment";

import {
  useFavoriteProductsMutation,
  useGetFavoritesByUserQuery,
} from "../../api/auth";

// !
import React, { useMemo } from "react";
import {
  Button,
  Space,
  notification,
  Avatar,
  Image,
  Input,
  Progress,
  Rate,
} from "antd";

const Context = React.createContext({ name: "Default" });

const Detail = () => {
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [api, contextHolder] = notification.useNotification();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const { data: getProduct }: any = useGetProductByIdQuery(id || "");
  const getUser = localStorage.getItem("Auth");
  const User = JSON.parse(getUser!);
  const idUser = User._id;
  const [addCommentMutation] = useAddCommentMutation();
  const [addFavorite] = useFavoriteProductsMutation();
  const { data: getFavorite } = useGetFavoritesByUserQuery();

  const setFavorite = getFavorite?.listProducts;
  const isFavorite =
    setFavorite && setFavorite.some((item: any) => item._id === id);

  // thông báo yêu thích
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);
  const submitFavorite = async () => {
    await addFavorite(id);

    api.info({
      message: "Thông tin",
      description: `Sản phẩm, ${contextValue.name}!`,
    });
  };
  const contextValue = {
    name: isFavoriteState ? "Không còn yêu thích" : "Đã thêm vào yêu thích",
  };

  // comment
  const getComments = getProduct?.comments?.map((item: any) => {
    return item.commentId;
  });
  const { data: getComment } = useGetCommentByIdQuery(getComments);

  //! thêm bình luận
  const handleRateChange = (newValue: any) => {
    setValue(newValue);
  };

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        book: id,
        stars: Number(value),
        comment,
        user: `${idUser}`,
      };

      await addCommentMutation(formData);
      setValue(0);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // !giỏ hàng
  const dispatch = useDispatch();
  const handleBuyButtonClick = () => {
    if (getProduct) {
      const { _id, name, price, images, totalPrice = price } = getProduct;
      const productToAdd = {
        _id,
        name,
        price,
        totalPrice,
        image: images[0]?.url || "",
        quantity: 1,
      };

      // Dispatch the addToCart action
      dispatch(addToCart(productToAdd));
    }
  };
  // !

  return (
    <section className="text-gray-600 body-font overflow-hidden max-w-7xl m-auto">
      <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>

      <div className="container px-5 py-24">
        <div className="lg:w-4/5 flex flex-wrap">
          <div>
            <div>
              <Image
                width={350}
                src={
                  getProduct?.images[0]?.url !== undefined
                    ? getProduct?.images[0]?.url
                    : ""
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {getProduct?.images[1]?.url ? (
                <Image
                  width={110}
                  height={100}
                  src={getProduct?.images[1]?.url}
                />
              ) : null}

              {getProduct?.images[2]?.url ? (
                <Image
                  width={110}
                  height={100}
                  src={getProduct?.images[2]?.url}
                />
              ) : null}

              {getProduct?.images[3]?.url ? (
                <Image
                  width={110}
                  height={100}
                  src={getProduct?.images[3]?.url}
                />
              ) : null}
            </div>
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {getProduct?.name}
            </h1>

            <div className="flex mb-4 flex-col">
              <div>
                <p>Nhà cung cấp: {getProduct?.author}</p>
                <p>Tác giả: {getProduct?.author}</p>
                <p>Nhà xuất Bản: {getProduct?.author}</p>
                <p>Hình thức Bìa mềm</p>
                <p>tiêu đề:{getProduct?.title}</p>
                <p>miêu tả: {getProduct?.description}</p>
              </div>

              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">(4 nhận xét)</span>
              </span>
            </div>
            <div className="flex mt-6 items-center pb-5 border-gray-100 mb-5"></div>
            <div className="flex gap-3">
              <span className="title-font font-medium text-2xl text-gray-900 ">
                {getProduct?.price} vnđ
              </span>

              <del>$380</del>
              <p className="rounded-2xl px-5 bg-red-500 flex justify-center items-center">
                -50%
              </p>

              <button
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                onClick={handleBuyButtonClick}
              >
                Mua
              </button>
              <button
                onClick={() => submitFavorite()}
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
              >
                <svg
                  fill={isFavorite ? "red" : "currentColor"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="font-bold mb-5">Sách Liên Quan</div>
      <div className="card border rounded-[10px] shadow p-[20px] m-[10px] text-center max-w-[300px] inline-block">
        <img src={getProduct?.images[0].url} alt="" />
        <h2>name</h2>
        <p>giá tiền</p>
      </div>

      <div className="card border rounded-[10px] shadow p-[20px] m-[10px] text-center max-w-[300px] inline-block">
        <img src={getProduct?.images[0].url} alt="" />
        <h2>name</h2>
        <p>giá tiền</p>
      </div>

      <div className="card border rounded-[10px] shadow p-[20px] m-[10px] text-center max-w-[300px] inline-block">
        <img src={getProduct?.images[0].url} alt="" />
        <h2>name</h2>
        <p>giá tiền</p>
      </div>

      <div className="card border rounded-[10px] shadow p-[20px] m-[10px] text-center max-w-[300px] inline-block ">
        <img src={getProduct?.images[0].url} alt="" />
        <h2>name</h2>
        <p>giá tiền</p>
      </div>

      <div className="my-10">
        <h1 className="font-bold">Đánh giá sản phẩm</h1>
        <div className="grid grid-cols-2 gap-20">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="">5/5</h1>
              <div>⭐⭐⭐⭐⭐</div>
              <p>(1 đánh giá)</p>
            </div>

            <div>
              <>
                <div className="flex">
                  <Progress percent={100} showInfo={false} /> 5⭐
                </div>

                <div className="flex">
                  <Progress percent={100} showInfo={false} /> 4⭐
                </div>

                <div className="flex">
                  <Progress percent={0} showInfo={false} /> 3⭐
                </div>

                <div className="flex">
                  <Progress percent={10} showInfo={false} /> 2⭐
                </div>

                <div className="flex">
                  <Progress percent={10} showInfo={false} /> 1⭐
                </div>
              </>
            </div>
          </div>

          <div>
            {getUser ? (
              <span>
                <h1 className="mb-2">Đánh giá sản phẩm:</h1>
                <Rate
                  tooltips={desc}
                  onChange={handleRateChange}
                  value={value}
                />
                {value ? (
                  <span className="ant-rate-text">{desc[value - 1]}</span>
                ) : (
                  ""
                )}
              </span>
            ) : (
              <p>
                bạn phải là thành viên mới được bình luận hãy
                <a href="/user/signup" className="text-[red] px-1">
                  Đăng ký
                </a>
                hoặc
                <a href="/user/login" className="text-[red] px-1">
                  Đăng nhập
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 bg-gray-400 rounded-md">
          <div className="flex flex-col gap-3 ml-4">
            {getComment
              ? getComment?.data?.map((comment: any, index: number) => {
                  return (
                    <div className="flex gap-2 pt-4" key={index}>
                      <Avatar src={getProduct?.images[0].url} />
                      <div className="flex flex-col">
                        <h1>{comment.user}</h1>
                        <h1 className="bg-blue-500 py-3 px-10 rounded-md">
                          {comment.comment}
                        </h1>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>

        <div className="border mt-4">
          {getUser ? (
            <Space.Compact style={{ width: "100%" }}>
              <Input
                defaultValue="mời nhập bình luận"
                value={comment}
                onChange={handleCommentChange}
              />
              <Button
                type="primary"
                className="bg-blue-500"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Space.Compact>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Detail;
