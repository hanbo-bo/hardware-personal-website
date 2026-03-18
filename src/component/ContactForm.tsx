import React, { useState } from 'react';

const ContactForm = () => {
  // 1. 使用 useState 管理表单状态
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '默认产品' // 假设你的下拉框默认值
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 处理输入框变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 2. 提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认刷新行为

    const { name, phone, product } = formData;

    // 验证逻辑
    if (!name.trim() || !phone.trim()) {
      alert('请填写您的称呼和手机号码哦！');
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. 发送请求 (这里的 URL 需对应你的后端接口)
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, product })
      });

      if (response.ok) {
        setIsSuccess(true);
        alert('提交成功！业务经理正在快马加鞭为您核算底价，请留意陌生来电。');
        // 清空表单
        setFormData({ name: '', phone: '', product: '默认产品' });
      } else {
        throw new Error('提交失败');
      }
    } catch (error) {
      alert('网络好像开小差了，请稍后再试或直接拨打客服电话。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 姓名输入框 */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="您的称呼"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* 手机号输入框 */}
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="手机号码"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* 产品选择 (示例) */}
      <div>
        <select 
          name="product" 
          value={formData.product} 
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="产品A">产品A</option>
          <option value="产品B">产品B</option>
        </select>
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-all mt-6 shadow-lg 
          ${isSuccess ? 'bg-green-600 shadow-green-600/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'}
          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'opacity-100'}
        `}
      >
        {isSubmitting ? '提交中...' : isSuccess ? '提交成功！' : '立即提交需求'}
      </button>
    </form>
  );
};

export default ContactForm;