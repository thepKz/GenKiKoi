import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 py-40">
        <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" alt="Lỗi 404" className="mb-10 w-1/3 h-auto" />

        <h2 className="text-3xl font-bold text-center mb-6 px-4">Rất tiếc, chúng tôi không thể tìm thấy tài nguyên bạn đang tìm kiếm.</h2>
        <p className="text-xl text-center mb-10 px-4">Vui lòng kiểm tra lại địa chỉ trang web đã được nhập chính xác. Hoặc,</p>
        <Link to="/" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-lg">
          Trở về Trang Chủ GenKiKoi
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;