const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Give time for all connections to close
  process.exit(0); // Force exit after all operations are done
};
// jest.config.js: Đây là file cấu hình chính cho Jest. Nó định nghĩa cách Jest sẽ chạy các test của bạn.
// jest.setup.js: File này chứa các cài đặt hoặc mocks cần được thực hiện trước khi các test bắt đầu chạy.
// jest.teardown.js: File này chứa code để dọn dẹp sau khi tất cả các test đã chạy xong (ví dụ: đóng kết nối database).