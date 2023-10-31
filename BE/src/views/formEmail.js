export const emailRegister = (name) => {
  return /*html*/ `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Cảm ơn bạn đã đăng ký tài khoản!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Kính gửi ${name},</p>
          <p>Chúng tôi xin gửi lời cảm ơn chân thành đến bạn vì đã đăng ký tài khoản trên trang web của chúng tôi.</p>
          <p>Việc đăng ký tài khoản sẽ giúp bạn trải nghiệm các dịch vụ và tiện ích tốt nhất mà chúng tôi cung cấp. Từ việc tìm sách dễ dàng đến những ưu đãi và khuyến mãi hấp dẫn, chúng tôi cam kết mang đến cho bạn trải nghiệm mua sách tốt nhất.</p>
          <p>Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email
          <a href="mailto:support@gmail.com" style="color: #007bff;  text-decoration: none;" >support@shopBook.com</a>
          hoặc số điện thoại 1800-203-203.
          </p>
          <p>Một lần nữa, chúng tôi xin chân thành cảm ơn bạn vì đã lựa chọn  chúng tôi. Chúng tôi rất mong được phục vụ bạn trong thời gian tới.</p>
          <p>Trân trọng,</p>
          <p>shop book ❤️❤️❤️</p>
        </div>
      </div>
    </div>
  `;
};

export const emailOauthRegister = (name, password) => {
  return /*html*/ `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Chào mừng ${name} đến với chúng tôi!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Xin chân thành cảm ơn ${name} đã lựa chọn chúng tôi.</p>
          <p>Tài khoản của bạn đã được tạo thành công trên trang web của chúng tôi.</p>
          <p>Mật khẩu mặc định của bạn là: <strong>${password}</strong></p>
          <p>Bạn có thể đăng nhập bằng tài khoản này và sau đó thay đổi mật khẩu theo ý muốn.</p>
          <p>Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email
          <a href="mailto:support@kinghotel.com" style="color: #007bff;  text-decoration: none;" >support@kinghotel.com</a>
          hoặc số điện thoại 1800-203-203.
          </p>
          <p>Chúng tôi rất mong được phục vụ bạn trong thời gian tới.</p>
          <p>Trân trọng,</p>
          <p>King Hotel</p>
        </div>
      </div>
    </div>
  `;
};