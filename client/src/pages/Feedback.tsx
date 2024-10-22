import { Divider } from 'antd';
import React, { useState } from 'react';
import { DividerComponent } from '../share';

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi feedback ở đây
    console.log('Rating:', rating, 'Message:', message);
  };

  return (
    <div>
    <div className="min-h-screen bg-blue-primary text-white flex items-center justify-center">
      <div className="w-full max-w-5xl flex">
        {/* Phần bên trái */}
        <div className="w-1/2 p-8 item">
          <h1 className="text-4xl font-bold mb-4">Hãy để lại phản hồi cho chúng tôi!</h1>
          <p className="text-lg">Vui lòng cung cấp phản hồi quý giá của bạn và giúp chúng tôi cải thiện.</p>
        </div>

        {/* Phần form bên phải */}
        <div className="w-1/2 bg-white text-gray-800 p-8 rounded-lg ">
          <h2 className="text-2xl font-semibold mb-4">Bạn có đề xuất gì cho chúng tôi hay không?</h2>
          <form onSubmit={handleSubmit}>
            {/* Rating */}
            <div className="mb-4">
              <label className="block mb-2">Đánh giá</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">Nhận xét</label>
              <textarea
                id="message"
                className="w-full p-2 border rounded"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhận xét của bạn..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-800 py-2 rounded font-semibold hover:bg-yellow-500"
            >
              Đánh giá & Gửi phản hồi
            </button>
          </form>
        </div>
      </div>
    </div>
    <DividerComponent />
    </div>
  );
};

export default Feedback;
