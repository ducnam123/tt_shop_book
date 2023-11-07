import { Container, ShowFaq } from "..";
const FaqPage = () => {
  return (
    <Container>
      <section className="relative overflow-hidden pt-10 bg-white rounded-xl my-5 p-10">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] text-center lg:mb-20">
                <span className="mb-2 block text-3xl font-bold text-primary">
                  F.A.Q
                </span>

                <p className="text-base text-body-color">
                  Không thể tìm thấy câu trả lời mà bạn đang tìm kiếm? Chúng tôi
                  đã chia sẻ một số trong số những câu hỏi thường gặp nhất của
                  bạn để giúp bạn ra ngoài!
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <ShowFaq
                header=" Làm thế nào tôi có thể đặt hàng?"
                text="Bạn có thể đặt hàng dễ dàng bằng cách sử dụng nền tảng trực tuyến của chúng tôi. Khi tìm thấy sản phẩm mình cần, bạn có thể thêm sản phẩm đó vào giỏ hàng, đăng nhập và thực hiện quy trình đặt hàng. Sau khi đơn đặt hàng đã sẵn sàng, bạn sẽ nhận được bản tóm tắt đơn đặt hàng qua email của mình. Tóm tắt đơn đặt hàng cũng sẽ được lưu vào tài khoản của bạn.
"
              />
              <ShowFaq
                header="Tôi nên nhập thông tin gì khi đặt hàng?"
                text="Hệ thống đặt hàng trực tuyến của chúng tôi sẽ yêu cầu tất cả các thông tin quan trọng mà bạn nên gửi. Nếu bạn có số VAT, hãy nhớ gửi nó. Điều này sẽ đảm bảo lô hàng không bị trì hoãn vì thiếu số VAT"
              />
              <ShowFaq
                header="Tôi có thể sử dụng phương thức thanh toán nào?"
                text="Nếu bạn là khách hàng có mối quan hệ khách hàng đã thiết lập với shopBook, bạn có thể sử dụng hóa đơn làm phương thức thanh toán trong quy trình thanh toán mua sắm trực tuyến của chúng tôi. Nếu tùy chọn lập hóa đơn không được kích hoạt cho bạn mặc dù bạn là khách hàng nhiều lần, vui lòng liên hệ với adb@gmail.com và thông báo cho chúng tôi."
              />
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <ShowFaq
                header="Có tính thuế GTGT không?"
                text="Nếu bạn có số VAT, thì VAT sẽ không bị tính. Bạn cần nhớ thêm mã số thuế GTGT vào phần thông tin tài khoản của mình. Hệ thống thanh toán trực tuyến sẽ tự động điền vào số VAT đã nộp khi bạn đặt hàng sản phẩm."
              />
              <ShowFaq
                header="Tôi phải làm gì nếu khoản thanh toán không được chấp nhận?"
                text="Vui lòng thử lại sau ít phút. Nếu thanh toán vẫn không được chấp nhận, vui lòng xác minh số dư tài khoản của bạn. Nếu mọi thứ vẫn như bình thường nhưng bạn vẫn không thể thực hiện thanh toán, vui lòng liên hệ với abc@gmail.com để thông báo cho chúng tôi về sự cố. Chúng tôi có thể quản lý đơn đặt hàng theo cách thủ công."
              />
              <ShowFaq
                header="Tôi có thể hủy đơn hàng của mình không?"
                text="Nếu bạn muốn hủy đơn đặt hàng của mình, vui lòng thực hiện càng sớm càng tốt. Nếu chúng tôi đã xử lý đơn đặt hàng của bạn, bạn cần liên hệ với chúng tôi và trả lại sản phẩm. Vui lòng liên hệ abc@gmail.com"
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FaqPage;
